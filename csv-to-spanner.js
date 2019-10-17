const dbConfig = require('./dbconfig');
const fs = require('fs');
const csv = require('csv-parser')

// google spanner variable
// Imports the Google Cloud client library
const {Spanner} = require('@google-cloud/spanner');

let projectId = dbConfig.gcp_spanner_config.projectId;
let instanceId = dbConfig.gcp_spanner_config.instanceId;
let databaseId = dbConfig.gcp_spanner_config.databaseId;
// Creates a client
const spanner = new Spanner({projectId});

// Gets a reference to a Cloud Spanner instance and database
const instance = spanner.instance(instanceId);
const database = instance.database(databaseId);

async function run(){
    for(let x=1;x<=dbConfig.gcp_spanner_config.no_of_files_to_upload;x++){
        const results = [];
 
            fs.createReadStream(`data/out_${x}.csv`)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                // console.log(results);
                    // The query to execute
                    spanner_insert(results);
                    
                
            });        
    }
    
}
run();

async function spanner_insert(results){
        try{
            const customersTable = database.table(dbConfig.gcp_spanner_config.table_name);
                    
            await customersTable.insert(results);
            console.log(`Inserted Data.`);
        }
        catch(err){
            console.log(err);
        }

}
