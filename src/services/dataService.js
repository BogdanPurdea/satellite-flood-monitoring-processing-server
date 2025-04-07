const { fetchFromDatabase, insertData } = require('./external/dataRepository');
const { fetchFromFastAPI } = require('./external/apiClient');
const { getBoundingBox } = require('../utils/geo');


async function fetchNDWI(start_date, end_date, min_lon, min_lat, max_lon, max_lat, api_endpoint) {
    // Try fetching from Supabase first
    const dbData = await fetchFromDatabase(start_date, end_date, min_lon, min_lat, max_lon, max_lat);
    
    if (dbData) {
        return dbData;
    }

    // If no data in database, fetch from FastAPI
    console.log("⚠️  Data not found in Supabase. Fetching from FastAPI...");
    const coords = [min_lon, min_lat, max_lon, max_lat];
    const apiData = await fetchFromFastAPI(start_date, end_date, coords, api_endpoint);
    
    // Store API data if it was successfully retrieved
    if (apiData.properties?.source === 'api') {
        await insertData(apiData);
    }

    return apiData;
}

async function fetchPolygonNDWI(start_date, end_date, coordinates, api_endpoint) {
    // Extract bounding box from polygon coordinates for database query
    const bbox = getBoundingBox(coordinates);
    const { min_lon, min_lat, max_lon, max_lat } = bbox;

    // Try fetching from Supabase first using bounding box
    const dbData = await fetchFromDatabase(start_date, end_date, min_lon, min_lat, max_lon, max_lat);
    
    if (dbData) {
        return dbData;
    }

    // If no data in database, fetch from FastAPI with polygon coordinates
    console.log("⚠️  Data not found in Supabase. Fetching from FastAPI...");
    const apiData = await fetchFromFastAPI(start_date, end_date, coordinates, api_endpoint);
    
    // Store API data if it was successfully retrieved
    if (apiData.properties?.source === 'api') {
        await insertData(apiData);
    }

    return apiData;
}

module.exports = { fetchNDWI, fetchPolygonNDWI };
