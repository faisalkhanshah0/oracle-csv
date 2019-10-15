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
     let result = await connection.execute("select * from customers", binds, options);
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

        console.log(data);

        const csvWriter = createCsvWriter({
          path: 'data/out.csv',
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
          .then(()=> console.log('The CSV file was written successfully'));

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