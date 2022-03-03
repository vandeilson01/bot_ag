var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "agendaco_dentistas",
  password: "fW2~q1y%qeZK"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});