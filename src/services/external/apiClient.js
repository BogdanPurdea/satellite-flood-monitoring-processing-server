
async function fetchFromFastAPI(start_date, end_date, min_lon, min_lat, max_lon, max_lat, api_endpoint) {
    const fastApiResponse = await fetch(api_endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            start_date,
            end_date,
            coordinates: [
                [parseFloat(min_lon), parseFloat(min_lat)],
                [parseFloat(max_lon), parseFloat(min_lat)],
                [parseFloat(max_lon), parseFloat(max_lat)],
                [parseFloat(min_lon), parseFloat(max_lat)],
                [parseFloat(min_lon), parseFloat(min_lat)]
            ],
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
