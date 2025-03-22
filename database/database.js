// Local conn string: "postgres://localhost/satellite_gis"

/**
 * Connects to postgresql db using connection_string.
 * Returns client object.
 * 
 * Example:
 *  pg_client = connect_db("postgres://localhost/satellite_gis");
 * run(pg_client);
 * 
 *  async function run(pg_client)
 *  {
 *      try {
 *          const query_res = await pg_client.query("SELECT * FROM tbl_test")
 *          console.log("We have db: ", query_res);
 *      } catch (err) {
 *          console.error("Why you have error :( ", err);
 *      } finally {
 *          await pg_client.end();
 *      }
 *  }
 */
function connect_db(connection_string)
{
    const {Client} = require("pg");

    const pg_client = new Client({
        connectionString: connection_string
    });
    pg_client.connect();
    return pg_client;
}

module.exports = {connect_db};