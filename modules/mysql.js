require('dotenv').config()
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'heijul_jamilgadia',
  user     : 'heijul_jamilgadia',
  password : 'Hess16ca@',
  database : 'heijul_jamilgadia'
});

module.exports = connection 

/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
*/