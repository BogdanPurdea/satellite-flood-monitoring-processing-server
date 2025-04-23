const config = require('../../config');
const { convertToWKT } = require('../../utils/geo');

async function fetchFromDatabase(start_date, end_date, min_lon, min_lat, max_lon, max_lat, isGrid = false, water_index = null) {
    // Choose the appropriate database function based on data type
    const dbFunction = isGrid ? "get_water_cells_data" : "get_data";
    
    // Prepare parameters
    const params = {
        start_date_param: start_date,
        end_date_param: end_date,
        min_lon: parseFloat(min_lon),
        min_lat: parseFloat(min_lat),
        max_lon: parseFloat(max_lon),
        max_lat: parseFloat(max_lat)
    };

    // Add water_index parameter for grid data
    if (isGrid && water_index) {
        params.water_index_param = water_index.toLowerCase();
    }

    const { data, error } = await config.supabase.client.rpc(dbFunction, params);

    if (error) {
        console.error(`Error calling Supabase function ${dbFunction}:`, error);
        return null;
    }

    if (data && data.length > 0) {
        console.log(`✅ ${isGrid ? 'Grid' : ''} Data found in Supabase`);
        return {
            type: "FeatureCollection",
            properties: {
                start_date,
                end_date,
                ...(water_index && { water_index })
            },
            features: data.map((row) => ({
                type: "Feature",
                geometry: row.geom,
                properties: {
                    start_date: row.start_date,
                    end_date: row.end_date,
                    ...(isGrid ? {
                        [`${row.water_index}_mean`]: row.index_mean,
                        water_coverage: row.water_coverage
                    } : {
                        ndwi_mean: row.ndwi_mean
                    })
                }
            }))
        };
    }

    return null;
}

async function insertData(featureCollection) {
    const { start_date, end_date } = featureCollection.properties;
    const features = featureCollection.features;

    if (!features || features.length === 0) {
        console.warn("⚠️  No features found in the FeatureCollection.");
        return;
    }

    // Prepare all features for batch insert
    const records = features.map(feature => ({
        start_date,
        end_date,
        ndwi_mean: feature.properties.ndwi_mean,
        geom: `SRID=4326;${convertToWKT(feature.geometry.coordinates)}`
    }));

    // Batch insert into Supabase
    const { data, error } = await config.supabase.client.from("water_data").insert(records);

    if (error) {
        console.error("🚨 Error inserting FeatureCollection into Supabase:", error);
    } else {
        console.log(`✅ Successfully inserted ${records.length} features into Supabase.`);
    }
}

async function insertGridData(featureCollection) {
    const { start_date, end_date, water_index } = featureCollection.properties;
    const features = featureCollection.features;

    if (!features || features.length === 0) {
        console.warn("⚠️  No features found in the grid FeatureCollection.");
        return;
    }

    // Prepare all grid cells for batch insert
    const records = features.map(feature => ({
        start_date,
        end_date,
        water_index: water_index.toLowerCase(),
        index_mean: feature.properties[`${water_index.toLowerCase()}_mean`],
        water_coverage: feature.properties.water_coverage,
        geom: `SRID=4326;${convertToWKT(feature.geometry.coordinates[0])}`
    }));

    // Batch insert into Supabase
    const { data, error } = await config.supabase.client
        .from("water_cells")
        .insert(records);

    if (error) {
        console.error("🚨 Error inserting grid data into Supabase:", error);
    } else {
        console.log(`✅ Successfully inserted ${records.length} grid cells into Supabase.`);
    }
}

module.exports = { fetchFromDatabase, insertData, insertGridData };
