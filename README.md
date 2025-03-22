# Middle Layer

A middleware Express server that handles satellite data processing requests, interfacing between clients and a FastAPI backend while managing data persistence in Supabase.

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with the following variables:
```
FASTAPI_URL=<your-fastapi-url>
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>
```
4. Start the server:
```bash
node server.js
```

## API Endpoints

### Get NDWI Data

Retrieves Normalized Difference Water Index (NDWI) data for a specified geographical area and time period.

**Endpoint:** `POST /ndwi`

**Request Body:**
```json
{
    "start_date": "YYYY-MM-DD",
    "end_date": "YYYY-MM-DD",
    "min_lon": number,
    "min_lat": number,
    "max_lon": number,
    "max_lat": number
}
```

**Response:**
```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                // GeoJSON geometry
            },
            "properties": {
                "start_date": "YYYY-MM-DD",
                "end_date": "YYYY-MM-DD",
                "ndwi_mean": number
            }
        }
    ]
}
```

## Data Flow

1. When a request is received, the server first checks for existing data in Supabase
2. If data exists, it returns the cached results
3. If no data is found, it forwards the request to the FastAPI backend
4. New data from the FastAPI is stored in Supabase before being returned

## Error Handling

- 400: Missing required parameters
- 500: Internal server error or FastAPI communication error

