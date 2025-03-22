class ApiRequest
{
    constructor(coordinates, start_date, end_date, vh_threshold = 1.25, ndwi_threshold = 0, mndwi_threshold = 0)
    {
        this.coordinates = coordinates;
        this.start_date = start_date;
        this.end_date = end_date;
        this.vh_threshold = vh_threshold;
        this.ndwi_threshold = ndwi_threshold;
        this.mndwi_threshold = mndwi_threshold;
    }
}

module.exports = {ApiRequest}