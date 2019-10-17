module.exports = {
    testdb: {
        user: 'system',
        password: 'toor',
        connectString : 'localhost:1521/xe',
        externalAuth  : false
    },    
    realdb: {
        user: 'system',
        password: 'xxxx',
        connectString : 'localhost:1521/xe',
        externalAuth  : false
        },
    config: {
        csv_record_limit_per_file: 3,        // setup these values that you want to export as csv from oracle
        table_name: 'customers'              // setup these values that you want to export as csv from oracle
    },
    gcp_spanner_config : {
        projectId : 'potent-bulwark-256105', // setup it before running program
        instanceId : 'db-instance-1',        // setup it before running program
        databaseId : 'test_spanner_db',      // setup it before running program
        table_name : 'customers',            // setup these values that you want to create on spanner
        no_of_files_to_upload : 3            // setup the no. of csv files you want to upload data from; to spanner   
    }
}