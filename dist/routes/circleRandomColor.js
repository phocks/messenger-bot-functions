"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
var PImage = require("pureimage");
var chroma = require("chroma-js");
exports.default = (req, res) => {
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
};
//# sourceMappingURL=circleRandomColor.js.map