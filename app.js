const express = require("express");
const mysql = require("mysql");

const app = express();
//create connections 
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"",
});
// connect to the dabatase 
db.connect((err)=> {
   if(err) {
    throw err
   }
   console.log("sucessfull connection");
    
});
app.get("/createdb",(req,res) =>{
    let sql = "create Database nodemysql";
    db.query(sql,(err,result) => {
        if(err) throw err;
        console.log("result");
        res.send("Database created")

    })
} );

// create table 
app.get("/createposttable",(req,res)=> {
    let sql = "create table posts(id int Auto_increment,title,varcgar(255),boby)"
    db.query(sql,(err,result)=> {
        if(err) throw err;
        console.log("result");
        res.send("DataBase created");

    })
});

// where the server is running in the port 3000;
app.listen("300",() =>{
    console.log("Server run : port 3000");
} )