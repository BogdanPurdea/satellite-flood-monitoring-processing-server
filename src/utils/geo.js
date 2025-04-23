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
    // If coordinates is a simple array of coordinates (grid cell case)
    if (Array.isArray(coordinates) && !Array.isArray(coordinates[0][0])) {
        // Ensure the polygon is closed by adding the first coordinate at the end if needed
        const coords = [...coordinates];
        if (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1]) {
            coords.push(coords[0]);
        }
        return `POLYGON((${coords.map(coord => `${coord[0]} ${coord[1]}`).join(", ")}))`;
    }
    
    // Handle nested arrays (regular polygon case)
    return `POLYGON((${coordinates[0].map(coord => `${coord[0]} ${coord[1]}`).join(", ")}))`;
}

module.exports = { getBoundingBox, convertToWKT };