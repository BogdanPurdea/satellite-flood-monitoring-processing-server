/**
 * List of [top_left, bottom_right],
 *  where top_left, bottom_right: [lat, long]
 */
const areas_unfitted = {
    ClujNapoca: [[46.8550, 23.3830], [46.6747, 23.8286]]
};

const test_areas_unfitted = {
    small_cluj: [[46.771137, 23.572336], [46.767411, 23.582422]]
}

/**
 * Returns resized area to fit chunks with given chunk size.
 * @param {float} chunk_size
 * @param {[top_left, bottom_right]} area 
 *  where top_left, bottom_right: [lat, long]
 */
function fit_chunks(area, chunk_size)
{
    const top_left = area[0];
    const bottom_right = area[1];

    const lat_bottom = Math.floor(bottom_right[0]/chunk_size) * chunk_size;
    const lat_top = Math.ceil(top_left[0]/chunk_size) * chunk_size;
    const long_left = Math.floor(top_left[1]/chunk_size) * chunk_size;
    const long_right = Math.ceil(bottom_right[1]/chunk_size) * chunk_size;

    const res = [[lat_top, long_left], [lat_bottom, long_right]];
    return res;
}

class RectangularArea
{
    static chunk_size = 0.0003; // very arbitrary

    /**
     * @param {[top_left, bottom_right]} area 
     *  where top_left, bottom_right: [lat, long]
     * @note Automatically resizes area to fit chunk_size.
     */
    constructor(area)
    {
        this.area = area;
        this.resize_fit_chunks();
    }

    /**
     * Resizes area (by adding) to so that it can be perfectly cut into chunks of chunk_size.
     * @returns resized area (returned area == this.area).
     */
    resize_fit_chunks()
    {
        this.area = fit_chunks(this.area, RectangularArea.chunk_size);
        return this.area;
    }

    calculate_chunks()
    {
        const top_left = this.area[0];
        const bottom_right = this.area[1];
        
        for (let lat = bottom_right[0]; lat < top_left[0]; lat += chunk_size)
        {
            for (let long = top_left[1]; long < bottom_right[1]; long += chunk_size)
            {
                
            }
        }
    }
}

export default {areas_unfitted, test_areas_unfitted, fit_chunks, RectangularArea};