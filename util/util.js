/**
 * Converts the two corners of a rectangle into a polygon
 * @param {coordinate} top_left 
 * @param {coordinate} bottom_right 
 * @returns {list[coordinate]} coordinates of the corners of the rectangle
 */
function generate_rectangle(top_left, bottom_right)
{
    return [top_left, [top_left[0], bottom_right[1]], bottom_right, [bottom_right[0], top_left[1]]];
}

export default {generate_rectangle};