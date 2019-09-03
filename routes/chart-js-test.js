const Chart = require("chart.js");
const { createCanvas, loadImage } = require("canvas");
const { CanvasRenderService } = require("chartjs-node-canvas");

module.exports = (req, res) => {
  // const canvas = createCanvas(chart.width, chart.height);
  // const ctx = canvas.getContext("2d");

  const width = 900;
  const height = 400;
  const configuration = {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(200, 99, 132)",
          data: [0, 10, 5, 2, 20, 30, 45]
        }
      ]
    },

    // Configuration options go here
    options: {}
  };

  // {
  //   type: "bar",
  //   data: {
  //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //     datasets: [
  //       {
  //         label: "# of Votes",
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(255, 206, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(255, 159, 64, 0.2)"
  //         ],
  //         borderColor: [
  //           "rgba(255,99,132,1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)"
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [
  //         {
  //           ticks: {
  //             beginAtZero: true,
  //             callback: value => "$" + value
  //           }
  //         }
  //       ]
  //     }
  //   }
  // };
  const chartCallback = ChartJS => {
    // Global config example: https://www.chartjs.org/docs/latest/configuration/
    ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
    // Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
    ChartJS.plugins.register({
      // plugin implementation
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

  // var chart = new Chart(ctx, {
  //   // The type of chart we want to create
  //   type: "line",

  //   // The data for our dataset
  //   data: {
  //     labels: ["January", "February", "March", "April", "May", "June", "July"],
  //     datasets: [
  //       {
  //         label: "My First dataset",
  //         backgroundColor: "rgb(255, 99, 132)",
  //         borderColor: "rgb(255, 99, 132)",
  //         data: [0, 10, 5, 2, 20, 30, 45]
  //       }
  //     ]
  //   },

  //   // Configuration options go here
  //   options: {}
  // });

  // var myChart = new Chart(ctx, {
  //   type: "bar",
  //   data: {
  //     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  //     datasets: [
  //       {
  //         label: "# of Votes",
  //         data: [12, 19, 3, 5, 2, 3],
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.2)",
  //           "rgba(54, 162, 235, 0.2)",
  //           "rgba(255, 206, 86, 0.2)",
  //           "rgba(75, 192, 192, 0.2)",
  //           "rgba(153, 102, 255, 0.2)",
  //           "rgba(255, 159, 64, 0.2)"
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //           "rgba(153, 102, 255, 1)",
  //           "rgba(255, 159, 64, 1)"
  //         ],
  //         borderWidth: 1
  //       }
  //     ]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [
  //         {
  //           ticks: {
  //             beginAtZero: true
  //           }
  //         }
  //       ]
  //     }
  //   }
  // });
};
