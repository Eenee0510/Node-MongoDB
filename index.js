require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bodyparser = require("body-parser")
const apiRoutes = require("./routes/api");


let db = mysql.createPool({
  host: "172.104.168.131",
  user: "sammy",
  password: "Pass@123",
  database: "mcsland2022",
  multipleStatements: true,
  insecureAuth : true
});
db.getConnection((err) => {
  if (!err) {
    console.log("Database connected successfully");
  } else {
    console.log("error!" + err);
  }
});

const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Application is started on PORT =");
});
