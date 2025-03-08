function main()
{
    const connect_db = require("./database");

    pg_client = connect_db("postgres://localhost/satellite_gis");
    run(pg_client);
}

async function run(pg_client)
{
    try {
        const query_res = await pg_client.query("SELECT * FROM tbl_test")
        console.log("We have db: ", query_res);
    } catch (err) {
        console.error("Why you have error :( ", err);
    } finally {
        await pg_client.end();
    }
}

if (require.main === module) {
    main();
}