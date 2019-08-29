const fs = require("fs");
const express = require("express");
const app = express();
const uuidv1 = require("uuid/v1");

const PORT = 5555;

app.get("/", (req, res, next) => {
  res.json({
    message:
      "Welcome to the messenger bot API. Written by Joshua Byrd. Please have a nice day."
  });
});

app.post("/name", (req, res, next) => {
  var formData = Object.keys(req.body).map(k => `${k}: ${req.body[k]}`);
  console.log(req.body);
  res.type("text/plain");
  // res.send(formData.join("\n"))
  const reply = {
    messages: [
      {
        attachment: {
          type: "image",
          payload: {
            url:
              "https://us-central1-abc-news-169508.cloudfunctions.net/messenger-bot-functions/circle-random-color?" +
              uuidv1()
          }
        }
      }
    ]
  };

  res.json(reply);
});

var PImage = require("pureimage");
var chroma = require("chroma-js");

app.get("/circle-random-color", (req, res) => {
  var img = PImage.make(100, 100);
  var ctx = img.getContext("2d");
  ctx.fillStyle = chroma.random().hex();
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, Math.PI * 2, true); // Outer circle
  ctx.closePath();
  ctx.fill();

  PImage.encodePNGToStream(img, fs.createWriteStream("/tmp/out.png"))
    .then(() => {
      const src = fs.createReadStream("/tmp/out.png");
      src.pipe(res);
    })
    .catch(e => {
      console.log("there was an error writing");
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Expose the express app to Google Cloud Functions
module.exports = { app };
