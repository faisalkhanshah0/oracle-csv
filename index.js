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
     let count = await connection.execute("select count(*) from customers", binds, options);
     let counter = Math.ceil(count.rows[0][0]/dbConfig.config.csv_record_limit_per_file);
    
     for(let x=1;x<=counter;x++){
      
      
      let offset_query = dbConfig.config.csv_record_limit_per_file*(x-1);
      let result = await connection.execute(`select * from customers OFFSET ${offset_query} ROWS FETCH NEXT ${dbConfig.config.csv_record_limit_per_file} ROWS ONLY`, binds, options);
      if(result.rows.length){
        // console.log(result.rows[0].length);
        // process.exit(0);
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
            if(y==0){
              make_header.push({
                id: 0, title: 'Id'
              });
            }
            else if(y==1){
              make_header.push({
                id: 1, title: 'Name'
              });
            }
            else if(y==2){
              make_header.push({
                id: 2, title: 'Surname'
              });
            }
            else if(y==3){
              make_header.push({
                id: 3, title: 'Age'
              });
            }
            else if(y==4){
              make_header.push({
                id: 4, title: 'Gender'
              });
            }
            
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