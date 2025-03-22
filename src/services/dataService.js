const { fetchFromDatabase, insertData } = require('./external/dataRepository');
const { fetchFromFastAPI } = require('./external/apiClient');

async function fetchNDWI(start_date, end_date, min_lon, min_lat, max_lon, max_lat, api_endpoint) {
    // Try fetching from Supabase first
    const dbData = await fetchFromDatabase(start_date, end_date, min_lon, min_lat, max_lon, max_lat);
    
    if (dbData) {
        return dbData;
    }

    // If no data in database, fetch from FastAPI
    console.log("⚠️  Data not found in Supabase. Fetching from FastAPI...");
    const apiData = await fetchFromFastAPI(start_date, end_date, min_lon, min_lat, max_lon, max_lat, api_endpoint);
    
    // Store API data if it was successfully retrieved
    if (apiData.properties?.source === 'api') {
        await insertData(apiData);
    }

    return apiData;
}

module.exports = fetchNDWI;
