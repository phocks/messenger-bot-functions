const fs = require("fs");
const PImage = require("pureimage");
const chroma = require("chroma-js");
const d3 = Object.assign({}, require("d3-selection"), require("d3-scale"));

var data = [1, 2, 13, 20, 23];

var scale = d3.scaleLinear()
  .range([10, 390])
  .domain([1,23]);

module.exports = (req, res) => {
  const img = PImage.make(400, 300);

  // const image = d3.select(img);
  // console.log(image);

  const context = img.getContext("2d");

  // ctx.fillStyle = chroma.random().hex();
  // ctx.beginPath();
  // ctx.arc(50, 50, 40, 0, Math.PI * 2, true); // Outer circle
  // ctx.closePath();
  // ctx.fill();

  data.forEach(function(d, i) {
    context.beginPath();
    context.fillRect(scale(d), 150, 10, 10);
    context.fillStyle="red";
    context.fill();
    context.closePath();
  });

  PImage.encodePNGToStream(img, fs.createWriteStream("/tmp/out.png"))
    .then(() => {
      const src = fs.createReadStream("/tmp/out.png");
      src.pipe(res);
    })
    .catch(e => {
      console.log("there was an error writing");
    });
};
