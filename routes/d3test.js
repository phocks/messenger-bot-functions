const fs = require("fs");
const PImage = require("pureimage");
const chroma = require("chroma-js");
const d3 = Object.assign({}, require("d3-selection"), require("d3-scale"));

var data = [1, 2, 13, 20, 23];

var scale = d3
  .scaleLinear()
  .range([10, 390])
  .domain([1, 23]);

module.exports = (req, res) => {
  const img = PImage.make(400, 300);

  // const image = d3.select(img);
  // console.log(image);

  const context = img.getContext("2d");

  var fnt = PImage.registerFont("./fonts/Roboto-Regular.ttf", "Roboto");

  fnt.load(() => {
    console.log("loaded");

    context.fillStyle = "green";
    context.font = "48pt 'Roboto'";
    context.fillText("ABC", 80, 80);

    data.forEach(function(d, i) {
      context.beginPath();
      context.fillStyle = "red";
      context.fillRect(scale(d), 150, 10, 10);
      context.fill();
      context.closePath();
    });

    context.fillStyle = chroma.random().hex();
    context.beginPath();
    context.arc(50, 50, 40, 0, Math.PI * 2, true); // Outer circle
    context.closePath();
    context.fill();

    PImage.encodePNGToStream(img, fs.createWriteStream("/tmp/out.png"))
      .then(() => {
        const src = fs.createReadStream("/tmp/out.png");
        src.pipe(res);
      })
      .catch(e => {
        console.log("there was an error writing");
      });
  });
};
