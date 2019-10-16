const {Storage} = require('@google-cloud/storage');
const oracledb = require('oracledb');
const dbConfig = require('./dbconfig');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function run(){
    let connection;
try{
    connection = await oracledb.getConnection(dbConfig.testdb);
    let options = {
        outFormat: oracledb.ARRAY   // query result format
        // extendedMetaData: true,   // get extra metadata
        // fetchArraySize: 100       // internal buffer allocation size for tuning
    };
     let binds = {};  // var to bind with first query
     let count = await connection.execute(`select count(*) from ${dbConfig.config.table_name}`, binds, options);
     let counter = Math.ceil(count.rows[0][0]/dbConfig.config.csv_record_limit_per_file);
     for(let x=1;x<=counter;x++){      
      let offset_query = dbConfig.config.csv_record_limit_per_file*(x-1);
      let result = await connection.execute(`select * from ${dbConfig.config.table_name} OFFSET ${offset_query} ROWS FETCH NEXT ${dbConfig.config.csv_record_limit_per_file} ROWS ONLY`, binds, options);
      let columns = result.metaData;
      if(result.rows.length){
        let data = [];
        for(let i=0; i<result.rows.length;i++){
          let map_var = {};
          for(let y=0;y<result.rows[0].length;y++){
            map_var[y] = result.rows[i][y];
          }
          data.push(map_var);
        }  
          let make_header = [];
          for(let y=0;y<result.rows[0].length;y++){
              make_header.push({
                id: y, title: columns[y].name
              });
          }
          const csvWriter = createCsvWriter({
            path: `data/out_${x}.csv`,
            header: make_header
          });
          csvWriter
            .writeRecords(data)
            .then(()=> console.log('The CSV file was written successfully'))
            .catch((err)=>{console.log(`Error in csv catch block ${x}:`, err);});
  
      }
    }
     
} catch(err){
    console.log('error in catch block',err);
} finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
}
}

run();