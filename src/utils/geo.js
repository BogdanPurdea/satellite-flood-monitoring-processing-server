function getBoundingBox(coordinates) {
    const lons = coordinates.map(coord => coord[0]);
    const lats = coordinates.map(coord => coord[1]);
    
    return {
        min_lon: Math.min(...lons),
        max_lon: Math.max(...lons),
        min_lat: Math.min(...lats),
        max_lat: Math.max(...lats)
    };
}

function convertToWKT(coordinates) {
    return `POLYGON((${coordinates[0].map(coord => coord.join(" ")).join(", ")}))`;
}

module.exports = { getBoundingBox, convertToWKT };