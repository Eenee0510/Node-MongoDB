const express = require("express");

const router = express.Router();
const mongoose = require("mongoose");
const Polls = require("../models/poll");


router.get("/users", (req, res) => {
  Users.find({}, function (err, data) {
    if (err) {
      throw err;
    } else {
      return res.json({
        data: data,
      });
    }
  });
});


router.post("/poll", (req, res) => {
  const reqBody = req.body;

  let newPoll = new Polls(

    {
      _id: new mongoose.Types.ObjectId(),
      pollName: reqBody.data
    }
    
  );

  
  newPoll
    .save()
    .then((data) => {
      return res.json({
        message: 'success',
        data: data,
      });
    })
    .catch((err) => {
      return res.json({
        message: 'error',
        error: err,
      });
    });
});
module.exports = router;
