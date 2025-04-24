# Flood Detection and Alert System - Middle Layer

Node.js/Express server that acts as an intermediary between the UI and the satellite data processing backend.

## Features

- Data caching and persistence using Supabase
- Flood risk monitoring with configurable thresholds
- WhatsApp notifications for flood alerts through Twilio
- Multiple data retrieval methods (bounding box, polygon, grid)

## API Endpoints

### Data Endpoints
- `POST /ndwi` - Get NDWI data for a bounding box
- `POST /ndwi-polygon` - Get NDWI data for a polygon
- `POST /grid-ndwi` - Get grid-based NDWI analysis
- `POST /grid-mndwi` - Get grid-based MNDWI analysis

### Monitoring Endpoints
- `POST /monitor-flood-risk` - Monitor flood risk with configurable thresholds

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`. The `.env.example` file provides an example.

## Running the Server

Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## Database Schema

### Water Data Table
Stores general water detection results:
- start_date: Date
- end_date: Date
- ndwi_mean: Float
- geom: Geography

### Water Cells Table
Stores grid-based analysis results:
- start_date: Date
- end_date: Date
- water_index: String (ndwi/mndwi)
- index_mean: Float
- water_coverage: Float
- geom: Geography

