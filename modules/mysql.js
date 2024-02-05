require('dotenv').config()
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : process.env.DB_USER,
  user     : 'heijul_jamilgadia',
  password : process.env.DB_PASSWORD,
  database : process.env.DB_USER
});

module.exports = connection 

/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
*/