const express = require("express");
const mysql = require("mysql");

const app = express();
//create connections 
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"123@",
    database: 'your_database_name',
});
// connect to the dabatase 
db.connect((err)=> {
    if(err){
        console.log("Error message:",err);
        return;

    } else {
        console.log("Successful connected to the database")
    }
   //if(err) {
    //throw err
  // }
   //console.log("sucessfull connection");
    
});
// Middleware to parse JSON requests
app.use(bodyParser.json());

// add the create the data using this code
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

    });
});

//PostData using the post request
app.post("/api/data",(res,req)=> {
    // the post of the name and the last time
    const { user , password} = req.body()
    if(!user || !password) {
        res.status(400).json({err:"The request was unsuccessful password or username are incorrect"});
        return;
    };
const query = 'INSERT INTO your_table_user (password, user) VALUES (?, ?)'
connect.query(query,[user,password],(err,query) => {
    if(err){
        res.status(500).json({err:"with the server"})
        return;
    }
    res.json({message:"data is upted",id:res.inertedId})

});

});

// where the server is running in the port 3000;
app.listen("300",() =>{
    console.log("Server run : port 3000");
});
