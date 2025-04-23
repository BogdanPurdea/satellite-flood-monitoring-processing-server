require('dotenv').config();
const supabase = require('./init_database');

const config = {
    port: process.env.PORT || 3000,
    fastapi: {
        url: process.env.FASTAPI_URL || "http://localhost:8000",
        endpoints: {
            s1_vh: "/get-s1-vh-mask",
            s2_ndwi: "/get-s2-ndwi-mask",
            s2_mndwi: "/get-s2-mndwi-mask",
            grid_ndwi: "/get-grid-ndwi",
            grid_mndwi: "/get-grid-mndwi"
        }
    },
    supabase: {
        client: supabase,
    },
    email: {
        enabled: process.env.EMAIL_ENABLED === 'true',
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        recipients: (process.env.ALERT_RECIPIENTS || '').split(',').filter(email => email)
    }
};

module.exports = config;