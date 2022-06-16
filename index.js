const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());
require("dotenv").config();

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


let db = mysql.createPool({
  host: "172.104.168.131",
  user: "myuser",
  password: "mYpass@123",
  database: "mcsland2022",
  multipleStatements: true,
});

db.getConnection((err) => {
  if (!err) {
    console.log("Database connected successfully");
  } else {
    console.log("error!" + err);
  }
});

app.post("/order", function (req, res) {
  
  const productName = req.body.pname;
  const productSize = req.body.psize;
  const productQ = req.body.pquantity;
  const userName = req.body.fname;
  const userPhone = req.body.fphone;
  const userCorp = req.body.fcorp;

  
  db.getConnection(function (err, connection){
    if (err) throw err;
    const sqlInsert = "INSERT INTO orders VALUES (?,?,?,?,?,?)";
    const insert_query = mysql.format(sqlInsert, [ productName, productSize, productQ, userName, userPhone, userCorp]);
    connection.query(insert_query, function(err, result){
      if (err) throw err;
    
      res.sendStatus(201);
    })
  })
})

app.post("/createUser", function (req, res) {
  const user = req.body.phone;
  const ssImage = req.body.image;
  db.getConnection(function (err, connection) {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM userTable WHERE user = ?";
    const search_query = mysql.format(sqlSearch, [user]);
    const sqlInsert = "INSERT INTO userTable VALUES (?,?)";
    const insert_query = mysql.format(sqlInsert, [user, ssImage]);
    // ? will be replaced by values
    // ?? will be replaced by string
    connection.query(search_query, function (err, result) {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      if (result.length != 0) {
        connection.release();
        console.log("------> User already exists");
        res.sendStatus(409);
      } else {
        connection.query(insert_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("--------> Created new User");
          if (ssImage == null) {
            console.log("pls import ss image!!!");
          } else {
            console.log("Your 1st asignment is done.");
          }
          console.log(result.insertId);
          res.sendStatus(201);
        });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
}); //end of app.post()

app.listen(process.env.PORT, ()=> console.log("server started"));
