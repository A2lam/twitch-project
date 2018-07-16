import config from 'config';
import mySql from 'mysql';

const connection = mySql.createConnection({
    host: config.get('host'),
    user: config.get('user'),
    password: config.get('password'),
    database: config.get('database'),
});

connection.connect(function (err) {
    if (err)
        throw err;
    console.log("connected to database");
})

module.exports = connection;