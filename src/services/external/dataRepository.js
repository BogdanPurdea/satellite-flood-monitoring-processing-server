const config = require('../../config');
const { convertToWKT } = require('../../utils/geo');

async function fetchFromDatabase(start_date, end_date, min_lon, min_lat, max_lon, max_lat) {
    const { data, error } = await config.supabase.client.rpc("get_data", {
        start_date_param: start_date,
        end_date_param: end_date,
        min_lon: parseFloat(min_lon),
        min_lat: parseFloat(min_lat),
        max_lon: parseFloat(max_lon),
        max_lat: parseFloat(max_lat)
    });

    if (error) {
        console.error("Error calling Supabase function:", error);
        return null;
    }

    if (data && data.length > 0) {
        console.log("✅ Data found in Supabase");
        return {
            type: "FeatureCollection",
            features: data.map((row) => ({
                type: "Feature",
                geometry: row.geom,
                properties: {
                    start_date: row.start_date,
                    end_date: row.end_date,
                    ndwi_mean: row.ndwi_mean
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

module.exports = { fetchFromDatabase, insertData };
