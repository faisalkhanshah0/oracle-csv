  // Imports the Google Cloud client library
  const {Spanner} = require('@google-cloud/spanner');
  const dbConfig = require('./dbconfig');
 
  let projectId = dbConfig.gcp_spanner_config.projectId;
  let instanceId = dbConfig.gcp_spanner_config.instanceId;
  let databaseId = dbConfig.gcp_spanner_config.databaseId;
  // Creates a client
  const spanner = new Spanner({projectId});
 
  // Gets a reference to a Cloud Spanner instance and database
  const instance = spanner.instance(instanceId);
  const database = instance.database(databaseId);
 
  async function run(){
    // The query to execute
  const query = {
    sql: 'SELECT * from customers',
  };
 
  // Execute a simple SQL statement
  const [rows] = await database.run(query);
  console.log(`Query: ${rows.length} found.`);
  rows.forEach(row => console.log(row));
  }

  run();
  