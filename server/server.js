import express, { json } from 'express';
import cors from 'cors';
import { getNDWIData } from '../controllers/mainController';
import { port } from '../config';

function run()
{
    // initialize express
    const app = express();
    app.use(json(), cors())

    app.get('/', (req, res) => {
        res.send("Flood detection API is running...");
    })

    app.post("/ndwi", getNDWIData);

    // start express
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
}

export default {run};