const express = require('express');
const cors = require('cors');
const mainController = require('./src/controllers/mainController');
const config = require('./src/config');

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
    res.send('Flood Detection API is running...');
});

// NDWI Route
app.post("/ndwi", mainController.getNDWIData);
app.post("/ndwi-polygon", mainController.getNDWIPolygonData);

// Start Server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
