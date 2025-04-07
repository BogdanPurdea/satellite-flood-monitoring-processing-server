const config = require('../config');
const { fetchNDWI, fetchPolygonNDWI } = require('../services/dataService.js');


const getNDWIData = async (req, res) => {
    try {
        const { start_date, end_date, min_lon, min_lat, max_lon, max_lat } = req.body;

        if (!start_date || !end_date || !min_lon || !min_lat || !max_lon || !max_lat) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const fastApiUrl = `${config.fastapi.url}${config.fastapi.endpoints.s2_ndwi}`;
        const data = await fetchNDWI(start_date, end_date, min_lon, min_lat, max_lon, max_lat, fastApiUrl);
        res.json(data);

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getNDWIPolygonData = async (req, res) => {
    try {
        const { start_date, end_date, coordinates } = req.body;

        if (!start_date || !end_date || !coordinates || !Array.isArray(coordinates)) {
            return res.status(400).json({ error: "Missing required parameters or invalid coordinates" });
        }

        // Validate coordinates format
        if (!coordinates.every(coord => 
            Array.isArray(coord) && coord.length === 2 && 
            typeof coord[0] === 'number' && typeof coord[1] === 'number')) {
            return res.status(400).json({ error: "Invalid coordinates format" });
        }

        const fastApiUrl = `${config.fastapi.url}${config.fastapi.endpoints.s2_ndwi}`;
        const data = await fetchPolygonNDWI(start_date, end_date, coordinates, fastApiUrl);
        res.json(data);

    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getNDWIData,
    getNDWIPolygonData
};
