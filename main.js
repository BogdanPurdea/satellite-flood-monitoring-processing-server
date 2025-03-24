const connect_db = require("./database/database").default;
const api = require("./api/api_request").default;
const util = require("./util/util").default;
const areas = require("./geography/areas").default;

function main()
{
    /*const test_cluj = new areas.RectangularArea(areas.test_areas_unfitted.small_cluj);
    console.log(test_cluj);*/

    server.run();

    /*const req = new api.ApiRequest(util.generate_rectangle(test_cluj.area), "2025-01-01", "2025-01-06");

    req.post(api.ApiRequest.urls.mndwi).then(
        (result) => {
            console.log(JSON.stringify(result, null, 2));
        }
    );*/
}

if (require.main === module) {
    main();
}