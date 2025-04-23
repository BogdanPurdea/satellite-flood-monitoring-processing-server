const { analyzeWaterCoverageChange } = require('../services/analysisService');
const { sendFloodAlert } = require('../services/notificationService');
const { fetchGridData } = require('../services/dataService.js');
const config = require('../config');

const monitorFloodRisk = async (req, res) => {
    try {
        const { coordinates, alertThreshold = 30 } = req.body;

        if (!coordinates || !Array.isArray(coordinates)) {
            return res.status(400).json({ error: "Missing or invalid coordinates" });
        }

        if (typeof alertThreshold !== 'number' || alertThreshold <= 0) {
            return res.status(400).json({ error: "Alert threshold must be a positive number" });
        }

        // Calculate non-overlapping time periods
        const now = new Date();
        const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
        const twoMonthsAgo = new Date(new Date().setMonth(now.getMonth() - 1));
        
        // Format dates for the two distinct periods
        const currentPeriodStart = oneMonthAgo.toISOString().split('T')[0];
        const currentPeriodEnd = new Date().toISOString().split('T')[0];
        const previousPeriodStart = twoMonthsAgo.toISOString().split('T')[0];
        const previousPeriodEnd = oneMonthAgo.toISOString().split('T')[0];

        // Make both requests concurrently
        const fastApiUrl = `${config.fastapi.url}${config.fastapi.endpoints.grid_mndwi}`;
        const [currentMonthData, previousMonthData] = await Promise.all([
            fetchGridData(currentPeriodStart, currentPeriodEnd, coordinates, fastApiUrl, 'MNDWI'),
            fetchGridData(previousPeriodStart, previousPeriodEnd, coordinates, fastApiUrl, 'MNDWI')
        ]);

        if (!currentMonthData?.features?.length || !previousMonthData?.features?.length) {
            return res.status(404).json({ error: "Could not retrieve water coverage data for one or both periods" });
        }

        // Analyze the change in water coverage
        const analysis = analyzeWaterCoverageChange(previousMonthData, currentMonthData);

        // Calculate the coverage increase
        const coverageIncrease = analysis.secondPeriodCoverage - analysis.firstPeriodCoverage;
        const coverageIncreasePercent = (coverageIncrease / analysis.firstPeriodCoverage) * 100;

        // Send alert if water coverage increased beyond threshold
        if (coverageIncreasePercent >= alertThreshold) {
            await sendFloodAlert(coordinates, coverageIncreasePercent);
        }

        res.json({
            status: 'success',
            data: {
                previousPeriodCoverage: analysis.firstPeriodCoverage,
                currentPeriodCoverage: analysis.secondPeriodCoverage,
                coverageChange: coverageIncreasePercent,
                isIncrease: coverageIncreasePercent > 0,
                alertSent: coverageIncreasePercent >= alertThreshold,
                alertThreshold,
                periods: {
                    previous: {
                        start: previousPeriodStart,
                        end: previousPeriodEnd
                    },
                    current: {
                        start: currentPeriodStart,
                        end: currentPeriodEnd
                    }
                }
            }
        });

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    monitorFloodRisk
};