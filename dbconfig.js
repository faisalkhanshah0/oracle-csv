module.exports = {
    testdb: {
        user: 'system',
        password: 'toor',
        connectString : 'localhost:1521/xe',
        externalAuth  : false
    },    
    realdb: {
        hostname: 'localhost',
        port: 1521,
        sid: 'xe',
        username: 'system',
        password: 'toor'
        },
    config: {
        csv_record_limit_per_file: 3,
        table_name: 'customers'
    }
}