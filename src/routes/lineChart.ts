const fs = require("fs");
const PImage = require("pureimage");
const { createCanvas, loadImage } = require("canvas");
const chroma = require("chroma-js");
const d3 = Object.assign({}, require("d3-scale"), require("d3-shape"));

const width = 1080;
const height = 810;

var data = {
  "1959": [1, 1871],
  "1960": [1, 1916],
  "1965": [1, 2000],
  "1966": [1, 2016],
  "1967": [6, 1026],
  "1968": [24, 501],
  "1969": [43, 354],
  "1970": [69, 289],
  "1971": [130, 201],
  "1972": [194, 140],
  "1973": [229, 129],
  "1974": [439, 114],
  "1975": [505, 94],
  "1976": [572, 77],
  "1977": [703, 60],
  "1978": [677, 63],
  "1979": [784, 54],
  "1980": [942, 45],
  "1981": [1252, 36],
  "1982": [1739, 18],
  "1983": [2121, 14],
  "1984": [2147, 14],
  "1985": [2241, 14],
  "1986": [2077, 13],
  "1987": [2282, 12],
  "1988": [2626, 9],
  "1989": [3363, 4],
  "1990": [3545, 4],
  "1991": [2896, 4],
  "1992": [1656, 3],
  "1993": [1550, 2],
  "1994": [1504, 2],
  "1995": [1667, 1],
  "1996": [1606, 1],
  "1997": [1674, 1],
  "1998": [1347, 1],
  "1999": [1278, 1],
  "2000": [1332, 1],
  "2001": [1310, 1],
  "2002": [1290, 1],
  "2003": [1117, 2],
  "2004": [1030, 2],
  "2005": [949, 3],
  "2006": [963, 2],
  "2007": [940, 3],
  "2008": [816, 5],
  "2009": [754, 9],
  "2010": [698, 10],
  "2011": [612, 21],
  "2012": [623, 18],
  "2013": [515, 25],
  "2014": [438, 33],
  "2015": [403, 39],
  "2016": [363, 42],
  "2017": [315, 57],
  "2018": [290, 60],
  Name: "JOSHUA",
  freq: "58650"
};

const newData = [];

for (let x in data) {
  if (x === "Name" || x === "freq") continue;
  newData.push({ year: +x, freq: data[x][0] });
}

const yScale = d3
  .scaleLinear()
  .domain([0, 4000])
  .range([height, 0]);

const xScale = d3
  .scaleLinear()
  .domain([1944, 2018])
  .range([0, width]);

export default (req, res) => {
  // const img = PImage.make(1080, 810);

  // const context = img.getContext("2d");

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  const line = d3
    .line()
    .x(function(d) {
      return xScale(d.year);
    })
    .y(function(d) {
      return yScale(d.freq);
    })
    .curve(d3.curveCardinal)
    .context(ctx);

  // var fnt = PImage.registerFont("./fonts/Roboto-Regular.ttf", "Roboto");

  // fnt.load(() => {
  //   console.log("font loaded...");

  ctx.fillStyle = "#333666";
  ctx.fillRect(0, 0, width, height);

  // console.log(newData);

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#FF2243";
  line(newData);
  ctx.stroke();

  ctx.fillStyle = chroma.random().hex();
  ctx.font = "48pt 'Roboto'";
  ctx.fillText("Joshua", 180, 180);

  // data.forEach(function(d, i) {
  //   context.beginPath();
  //   context.fillStyle = "red";
  //   context.fillRect(scale(d), 150, 10, 10);
  //   context.fill();
  //   context.closePath();
  // });

  ctx.fillStyle = chroma.random().hex();
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, Math.PI * 2, true); // Outer circle
  ctx.closePath();
  ctx.fill();

  // PImage.encodePNGToStream(img, fs.createWriteStream("/tmp/out.png"))
  //   .then(() => {
  //     const src = fs.createReadStream("/tmp/out.png");
  //     src.pipe(res);
  //   })
  //   .catch(e => {
  //     console.log("there was an error writing");
  //   });
  // });

  res.set("Content-Type", "image/png");
  res.send(canvas.toBuffer());
};
