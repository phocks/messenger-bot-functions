const { CanvasRenderService } = require("chartjs-node-canvas");

import { getNameData } from "../nameData";

export default (req, res) => {
  const returnedData = getNameData("joshua");

  const transformedData = { labels: [], data: [], name: "" };

  transformedData.labels = [];

  returnedData.forEach(entry => {
    transformedData.labels.push(entry.year);
    transformedData.data.push(entry.percentage);
    transformedData.name = entry.name;
  });

  const width = 900;
  const height = 400;
  const configuration = {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: transformedData.labels,
      datasets: [
        {
          label: returnedData[0].name,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(200, 99, 132)",
          data: transformedData.data
        }
      ]
    },

    // Configuration options go here
    options: {}
  };

  const chartCallback = ChartJS => {
    // Global config example: https://www.chartjs.org/docs/latest/configuration/
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
    ChartJS.plugins.register({
      // plugin implementation
      beforeDraw: function(chartInstance) {
        var ctx = chartInstance.chart.ctx;
        ctx.fillStyle = "white";
        ctx.fillRect(
          0,
          0,
          chartInstance.chart.width,
          chartInstance.chart.height
        );
      }
    });
    // New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
    ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
      // chart implementation
    });
  };

  (async () => {
    const canvasRenderService = new CanvasRenderService(
      width,
      height,
      chartCallback
    );
    const image = await canvasRenderService.renderToBuffer(configuration);
    const dataUrl = await canvasRenderService.renderToDataURL(configuration);
    const stream = canvasRenderService.renderToStream(configuration);

    res.set("Content-Type", "image/png");
    res.send(image);
  })();
};
