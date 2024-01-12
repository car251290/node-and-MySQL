
// create a table 

let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "myusername",
  password: "mypassword",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*Create a table named "customers":*/
  let sql = "CREATE TABLE customers (name VARCHAR(255), phone(23-####), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    console.log(result);
  });
});


