require('dotenv').config();
const supabase = require('../database/init_database');

const config = {
    port: process.env.PORT || 3000,
    fastapi: {
        url: process.env.FASTAPI_URL,
        endpoints: {
            s1_vh: "/get-s1-vh-mask",
            s2_ndwi: "/get-s2-ndwi-mask",
            s2_mndwi: "/get-s2-mndwi-mask",
        }
    },
    supabase: {
        client: supabase,
    }
};

module.exports = config;