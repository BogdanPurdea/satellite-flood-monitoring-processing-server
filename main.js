const connect_db = require("./database");

pg_client = connect_db("postgres://localhost/satellite_gis");

async function run()
{
    try {
        //const tables = pgis.list_tables({ filter: "table_type = \'BASE TABLE\'" });
        //console.log("Tables: ", tables);
        const query_res = await pg_client.query("SELECT * FROM tbl_test")
        console.log("We have db: ", query_res);
    } catch (err) {
        console.error("Why you have error :( ", err);
    } finally {
        //await pgclient.end();
    }
}

run();