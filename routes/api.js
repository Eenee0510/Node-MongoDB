const express = require("express");
const mysql = require("mysql");
const router = express.Router();



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
    
      res.sendStatus(201);
    })
  })
})


module.exports = router;
