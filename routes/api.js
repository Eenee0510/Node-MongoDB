const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const path = require('path');

// const app = express();
// app.use(express.static(__dirname));


router.post("/order", function (req, res) {
  
  const productName = req.body.pname;
  const productSize = req.body.psize;
  const productQ = req.body.pquantity;
  const userName = req.body.fname;
  const userPhone = req.body.fphone;
  const userCorp = req.body.fcorp;
  let db = mysql.createPool({
    host: "172.104.168.131",
    user: "sammy",
    password: "Pass@123",
    database: "mcsland2022",
    multipleStatements: true,
    insecureAuth : true
  });
  
  db.getConnection(function (err, connection){
    if (err) throw err;
    const sqlInsert = "INSERT INTO orders VALUES (?,?,?,?,?,?)";
    const insert_query = mysql.format(sqlInsert, [ productName, productSize, productQ, userName, userPhone, userCorp]);
    connection.query(insert_query, function(err, result){
      if (err) throw err;
})
    
    res.sendFile(path.join(__dirname, '/index.html'));
  })
})

router.post("/lottery", function (req, res) {
  
  const phone = req.body.phone;
  
  console.log(req.body)
  let db = mysql.createPool({
    host: "172.104.168.131",
    user: "sammy",
    password: "Pass@123",
    database: "mcsland2022",
    multipleStatements: true,
    insecureAuth : true
  });
  
  db.getConnection(function (err, connection) {
    if (err) throw err;
    const sqlSearch = "SELECT * FROM lucky_user WHERE phone = ?";
    const search_query = mysql.format(sqlSearch, [phone]);
    const sqlInsert = "INSERT INTO lucky_user(phone, gift_name, gift_id) select ?, gift_name, gift_id from gifts where quantity = 1 order by rand() limit 1; update gifts set quantity = 0 where gift_id = (select gift_id from lucky_user where lucky_id = LAST_INSERT_ID()); select * from lucky_user where lucky_id = LAST_INSERT_ID();" ;
    const insert_query = mysql.format(sqlInsert, [phone]);
   
    
    // ? will be replaced by values
    // ?? will be replaced by string
    connection.query(search_query, function (err, result) {
      if (err) throw err;
      console.log("------> Search Results");
      console.log(result.length);
      if (result.length != 0) {
        connection.release();
        console.log("------> User already exists" + result);
        res.json(result[0]);
      } else {
        connection.query()
        connection.query(insert_query, (err, result) => {
          connection.release();
          if (err) throw err;
          console.log("--------> Created new User" + result)
          res.json(result[2][0]);
        });
      }
    }); //end of connection.query()
  }); //end of db.getConnection()
    
    // res.sendFile(path.join(__dirname, '/index.html'));
  })

  router.post("/lucky", function (req, res) {
    const phonnum = req.body.phonnum;
    let db = mysql.createPool({
      host: "172.104.168.131",
      user: "sammy",
      password: "Pass@123",
      database: "mcsland2022",
      multipleStatements: true,
      insecureAuth : true
    });
    db.getConnection(function (err, connection) {
      if (err) throw err;
      const sqlSearch = "SELECT * FROM lucky WHERE phonnum = ?";
      const search_query = mysql.format(sqlSearch, [phonnum]);
      const sqlInsert = "INSERT INTO lucky VALUES (?)";
      const insert_query = mysql.format(sqlInsert, [phonnum]);
      // ? will be replaced by values
      // ?? will be replaced by string
      connection.query(search_query, function (err, result) {
        if (err) throw err;
        console.log("------> Search Results");
        console.log(result.length);
        if (result.length != 0) {
          connection.release();
          console.log("------> User already exists");
          res.send("Бүртгэгдсэн дугаар байна.")
        } else {
          connection.query(insert_query, (err, result) => {
            connection.release();
            if (err) throw err;
            console.log("--------> Created new User");
        
            console.log(result.insertId);
            res.send("Амжилттай бүртгэгдлээ.")
          });
        }
      }); //end of connection.query()
    }); //end of db.getConnection()
  }); 

  router.get("/lists", function (req, res) {
    
    let db = mysql.createPool({
      host: "172.104.168.131",
      user: "sammy",
      password: "Pass@123",
      database: "mcsland2022",
      multipleStatements: true,
      insecureAuth : true
    });
    db.getConnection(function (err, connection) {
      if (err) throw err;
      const sqlSearch = "SELECT * FROM lucky";
      const search_query = mysql.format(sqlSearch);
     
      connection.query(search_query, function (err, result) {
        if (err) throw err;
        const list = JSON.stringify(result)
        // res.json(list)
        res.send(list)
        })
      });
    }); 
  
 
module.exports = router;
