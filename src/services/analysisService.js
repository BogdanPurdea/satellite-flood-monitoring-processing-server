function calculateTotalWaterCoverage(features) {
    if (!features || features.length === 0) return 0;
    
    const totalCoverage = features.reduce((sum, feature) => {
        return sum + (feature.properties.water_coverage || 0);
    }, 0);
    
    return totalCoverage / features.length;
}

function analyzeWaterCoverageChange(firstPeriodData, secondPeriodData) {
    if (!firstPeriodData?.features || !secondPeriodData?.features) {
        throw new Error('Invalid data format');
    }

    const firstPeriodCoverage = calculateTotalWaterCoverage(firstPeriodData.features);
    const secondPeriodCoverage = calculateTotalWaterCoverage(secondPeriodData.features);
    
    // Calculate percentage change
    const coverageChange = ((secondPeriodCoverage - firstPeriodCoverage) / firstPeriodCoverage) * 100;
    
    return {
        firstPeriodCoverage,
        secondPeriodCoverage,
        coverageChange
    };
}

module.exports = { analyzeWaterCoverageChange };