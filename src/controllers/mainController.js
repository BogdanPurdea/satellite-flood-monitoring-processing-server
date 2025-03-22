const config = require('../config');
const fetchNDWI = require('../services/dataService.js');

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

module.exports = {
    getNDWIData
};
