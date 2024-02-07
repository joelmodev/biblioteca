require('dotenv').config()

const sqlite3 = require('sqlite3');
const connection = new sqlite3.Database('data.sqlite');

module.exports = connection 

/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
*/