const connect_db = require("./database/database");
const api = require("./api/api_request").default;
const util = require("./util/util").default;

function main()
{
    //pg_client = connect_db("postgres://localhost/satellite_gis");
    //run(pg_client);

    const req = new api.ApiRequest(util.generate_rectangle([45.0, 25.0], [45.1, 25.1]), "2024-11-01", "2024-12-01");

    req.post(api.ApiRequest.urls.vh).then(
        (result) => {
            console.log("VH\n", result);
        }
    )

    req.post(api.ApiRequest.urls.ndwi).then(
        (result) => {
            console.log("NDWI\n", result);
        }
    )

    req.post(api.ApiRequest.urls.mndwi).then(
        (result) => {
            console.log("MNDWI\n", result);
        }
    )
}

/*async function run(pg_client)
{
    try {
        const query_res = await pg_client.query("SELECT * FROM tbl_test")
        console.log("We have db: ", query_res);
    } catch (err) {
        console.error("Why you have error :( ", err);
    } finally {
        await pg_client.end();
    }
}*/

if (require.main === module) {
    main();
}