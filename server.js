const express = require('express');
const cors = require('cors');
const dataController = require('./src/controllers/dataController');
const floodMonitoringController = require('./src/controllers/floodMonitoringController');
const config = require('./src/config');

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// Basic Route
app.get('/', (req, res) => {
    res.send('Flood Detection API is running...');
});

// Data Routes
app.post("/ndwi", dataController.getNDWIData);
app.post("/ndwi-polygon", dataController.getNDWIPolygonData);
app.post("/grid-ndwi", dataController.getGridNDWI);
app.post("/grid-mndwi", dataController.getGridMNDWI);

// Flood Monitoring Routes
app.post("/monitor-flood-risk", floodMonitoringController.monitorFloodRisk);

// Start Server
app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
