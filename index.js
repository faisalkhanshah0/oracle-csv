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
      
        let data = [];
        for(let i=0; i<result.rows.length;i++){
          data.push({
            id: result.rows[i][0],
            name: result.rows[i][1],
            surname: result.rows[i][2],
            age: result.rows[i][3],
            gender: result.rows[i][4],
        });
        }  
          // console.log(data);
          const csvWriter = createCsvWriter({
            path: `data/out_${x}.csv`,
            header: [
              {id: 'id', title: 'Id'},
              {id: 'name', title: 'Name'},
              {id: 'surname', title: 'Surname'},
              {id: 'age', title: 'Age'},
              {id: 'gender', title: 'Gender'},
            ]
          });
          
          csvWriter
            .writeRecords(data)
            .then(()=> console.log('The CSV file was written successfully'))
            .catch((err)=>{console.log('Error in csv catch block :', err);});
  
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