const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
require("dotenv").config();
const port = 5001;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("test!");
});

app.post("/searching", async (req, res) => {
  console.log("Checking imgix status in /testsearch");
  let arrSearchImgix = ["test"];
  let sentFromFrontend = req.body.sendToBackend;

  var config = {
    method: "get",
    url: "https://api.imgix.com/api/v1/assets/622f76522d67dbae5fb46268?filter[tags]=cup",
    headers: {
      Authorization: "Bearer " + process.env.IMGIX_API,
      "Content-Type": "application/vnd.api+json",
    },
  };

  let grabAll = await axios(config)
    .then(function (response) {
      for (var i = 0; i < response.data.data.length; i++) {
        arrSearchImgix.push(response.data.data[i].attributes.origin_path);
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });

  return res.status(200).send(arrSearchImgix);
});
//
app.post("/testsearching", async (req, res) => {
  console.log("Checking imgix status in /testsearch");
  let arrSearchImgix = [];
  let sentFromFrontend = req.body.sendToBackend;

  var config = {
    method: "get",
    url: "https://api.imgix.com/api/v1/assets/622f76522d67dbae5fb46268?filter[tags]=cup",
    headers: {
      Authorization: "Bearer " + process.env.IMGIX_API,
      "Content-Type": "application/vnd.api+json",
    },
  };

  let grabAll = await axios(config)
    .then(function (response) {
      for (var i = 0; i < response.data.data.length; i++) {
        arrSearchImgix.push(response.data.data[i].attributes.origin_path);
      }
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });

  return res.status(200).send(arrSearchImgix);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
