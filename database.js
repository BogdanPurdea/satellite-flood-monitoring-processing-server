// Local conn string: "postgres://localhost/satellite_gis"

/**
 * Connects to postgresql db using connection_string.
 * Returns client object.
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

module.exports = connect_db;