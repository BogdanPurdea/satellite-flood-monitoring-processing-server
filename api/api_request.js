import fetch from "node-fetch";

/**
 * Example:
 *  const req = new api.ApiRequest(util.generate_rectangle([45.0, 25.0], [45.1, 25.1]), "2024-11-01", "2024-12-01");
    req.post(api.ApiRequest.urls.ndwi).then(
        (result) => {
            console.log(result);
        }
    )
 */
class ApiRequest
{
    static urls = {
        vh: "http://127.0.0.1:8000/get-s1-vh-mask",
        ndwi: "http://127.0.0.1:8000/get-s2-ndwi-mask",
        mndwi: "http://127.0.0.1:8000/get-s2-mndwi-mask"
    };

    constructor(coordinates, start_date, end_date, vh_threshold = 1.25, ndwi_threshold = 0, mndwi_threshold = 0)
    {
        this.coordinates = coordinates;
        this.start_date = start_date;
        this.end_date = end_date;
        this.vh_threshold = vh_threshold;
        this.ndwi_threshold = ndwi_threshold;
        this.mndwi_threshold = mndwi_threshold;
    }
    
    /**
     * @param {string} endpoint The url to connect to. See ApiRequest.urls .
     * @returns 
     */
    async post(endpoint)
    {
        const body = {
            "coordinates" : [
                this.coordinates
            ],
            "start_date": this.start_date,
            "end_date": this.end_date,
            "vh_threshold": this.vh_threshold,
            "ndwi_threshold": this.ndwi_threshold,
            "mndwi_threshold": this.mndwi_threshold
        };
    
        const res = await fetch(endpoint,
            {
                method: "post",
                body: JSON.stringify(body),
                headers: {'Content-Type': 'application/json'}
            }
        );
        return await res.json();
    }
}

export default {ApiRequest}