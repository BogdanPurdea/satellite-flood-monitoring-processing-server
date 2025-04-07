async function fetchFromFastAPI(start_date, end_date, coordinates, api_endpoint) {
    // If coordinates is an array of arrays, it's a polygon
    // If it's individual bbox values, construct the polygon
    const polygonCoordinates = Array.isArray(coordinates) 
        ? coordinates 
        : [
            [parseFloat(coordinates.min_lon), parseFloat(coordinates.min_lat)],
            [parseFloat(coordinates.max_lon), parseFloat(coordinates.min_lat)],
            [parseFloat(coordinates.max_lon), parseFloat(coordinates.max_lat)],
            [parseFloat(coordinates.min_lon), parseFloat(coordinates.max_lat)],
            [parseFloat(coordinates.min_lon), parseFloat(coordinates.min_lat)]
        ];

    const fastApiResponse = await fetch(api_endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            start_date,
            end_date,
            coordinates: polygonCoordinates,
            vh_threshold: 1.25,
            ndwi_threshold: 0
        })
    });

    if (!fastApiResponse.ok) {
        throw new Error("Failed to fetch NDWI data from FastAPI");
    }

    return await fastApiResponse.json();
}

module.exports = { fetchFromFastAPI };
