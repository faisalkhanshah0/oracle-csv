  // Imports the Google Cloud client library
  const {Spanner} = require('@google-cloud/spanner');
 
  // Creates a client
  const spanner = new Spanner({projectId});
 
  // Gets a reference to a Cloud Spanner instance and database
  const instance = spanner.instance(instanceId);
  const database = instance.database(databaseId);
 
  // The query to execute
  const query = {
    sql: 'SELECT 1',
  };
 
  // Execute a simple SQL statement
  const [rows] = database.run(query);
  console.log(`Query: ${rows.length} found.`);
  rows.forEach(row => console.log(row));