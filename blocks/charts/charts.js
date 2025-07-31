// const script = document.createElement('script');
// script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
// document.head.appendChild(script);

const API_URL = 'https://mocki.io/v1/257fd7fc-f7af-4dbd-8396-27923afbd0aa';

// // Helper to wait for Chart.js to load
// function waitForChartJS() {
//   return new Promise((resolve) => {
//     if (window.Chart) {
//       resolve();
//     } else {
//       script.onload = resolve;
//     }
//   });
// }

async function getChartJSON() {
  return fetch(API_URL).then((response) => response.json());
}

export default async function decorate(block) {
  // await waitForChartJS();
  // const canvas = document.createElement('canvas');
  // canvas.id = 'myChart';
  // canvas.width = 800;
  // canvas.height = 400;
  const chartJSON = await getChartJSON();
  block.textContent = JSON.stringify(chartJSON);
  // block.appendChild(canvas);
  // const ctx = canvas.getContext('2d');
  // // Prepare labels and datasets
  // const labels = chartJSON.map((item) => item.name);
  // const rexultiData = chartJSON.map((item) => item.rexulti);
  // const placeboData = chartJSON.map((item) => item.placebo);
  // // Chart config
  // const config = {
  //   type: 'bar',
  //   data: {
  //     labels,
  //     datasets: [
  //       {
  //         label: 'Rexulti',
  //         data: rexultiData,
  //         backgroundColor: 'rgba(118, 155, 205)',
  //         borderColor: 'rgba(118, 155, 205)',
  //         borderWidth: 1,
  //       },
  //       {
  //         label: 'Placebo',
  //         data: placeboData,
  //         backgroundColor: 'rgba(136, 136, 136)',
  //         borderColor: 'rgba(136, 136, 136)',
  //         borderWidth: 1,
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: false,
  //     maintainAspectRatio: false,
  //     scales: {
  //       x: {
  //         beginAtZero: false, // because values are negative
  //         ticks: {
  //           font: {
  //             size: 14,
  //             family: 'Roboto',
  //             weight: 'bold',
  //           },
  //         },
  //       },
  //       y: {
  //         beginAtZero: false, // because values are negative
  //         title: {
  //           display: true,
  //           text: 'Aggressive Behaviors',
  //           font: {
  //             size: 14,
  //             family: 'Roboto',
  //             weight: 'bold',
  //           },
  //         },
  //       },
  //     },
  //     plugins: {
  //       title: {
  //         display: true,
  //         text: 'Behavioral Changes: Rexulti vs Placebo',
  //         font: {
  //           size: 14,
  //           family: 'Roboto',
  //           weight: 'bold',
  //         },
  //       },
  //       legend: {
  //         display: true,
  //         position: 'bottom',
  //         align: 'start',
  //       },
  //     },
  //   },
  // };
  // // Render char
  // new Chart(ctx, config);
}
