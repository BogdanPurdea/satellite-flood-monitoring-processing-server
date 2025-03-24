function convertToWKT(coordinates) {
    return `POLYGON((${coordinates[0].map(coord => coord.join(" ")).join(", ")}))`;
}

module.exports = { convertToWKT };