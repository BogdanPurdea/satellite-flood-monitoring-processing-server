/**
 * Calculates total water coverage for all grid cells
 * @param {Object} gridData GeoJSON FeatureCollection with water coverage data
 * @returns {number} Average water coverage percentage across all cells
 */
function calculateTotalWaterCoverage(gridData) {
    if (!gridData?.features || gridData.features.length === 0) {
        return 0;
    }

    const features = gridData.features;
    const totalCells = features.length;

    // Sum up water coverage percentages from all cells
    const totalCoverage = features.reduce((sum, feature) => {
        // water_coverage is already a percentage value (0-100)
        return sum + (feature.properties.water_coverage || 0);
    }, 0);

    // Return average water coverage percentage across all cells
    return totalCoverage / totalCells;
}

/**
 * Analyzes water coverage change between two time periods
 * @param {Object} firstPeriodData GeoJSON FeatureCollection from first period
 * @param {Object} secondPeriodData GeoJSON FeatureCollection from second period
 * @returns {Object} Analysis results including coverage values and absolute change
 */
function analyzeWaterCoverageChange(firstPeriodData, secondPeriodData) {
    if (!firstPeriodData?.features || !secondPeriodData?.features) {
        throw new Error('Invalid data format');
    }

    // Calculate average water coverage percentage for both periods
    const firstPeriodCoverage = calculateTotalWaterCoverage(firstPeriodData);
    const secondPeriodCoverage = calculateTotalWaterCoverage(secondPeriodData);

    // Calculate the absolute change in coverage percentage
    const absoluteChange = secondPeriodCoverage - firstPeriodCoverage;

    return {
        firstPeriodCoverage,        // Average percentage across all cells in first period
        secondPeriodCoverage,       // Average percentage across all cells in second period
        absoluteChange,             // Absolute percentage point change
    };
}

module.exports = { analyzeWaterCoverageChange, calculateTotalWaterCoverage };