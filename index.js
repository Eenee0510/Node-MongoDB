const mongoose = require("mongoose");
require("dotenv").config();
const express = require("express");
console.log(process.env.ATLAS_CONNECTION_URL);

const apiRoutes = require("./routes/api");
const res = require("express/lib/response");

mongoose
  .connect(process.env.ATLAS_CONNECTION_URL, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

app.listen(process.env.PORT, () => {
  console.log("Application is started on PORT =" + process.env.PORT);
});
