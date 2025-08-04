// const API_URL = 'https://mocki.io/v1/257fd7fc-f7af-4dbd-8396-27923afbd0aa';

async function getChartJSON(API_URL) {
  return fetch(API_URL).then((response) => response.json());
}

export default async function decorate(block) {
  let relativeJSONPath = null;
  let yAxisLabel = null;
  let xAxisLabel = null;
  let chartType = null;

  const children = Array.from(block.children);

  children.forEach((child, i) => {
    if (i === 0) {
      relativeJSONPath = child.querySelector('a').getAttribute('href');
      child.style.display = 'none';
    } else if (i === 1) {
      yAxisLabel = child.querySelector([
        'p[data-aue-prop="yAxisLabel"]',
      ])?.textContent;
      child.style.display = 'none';
    } else if (i === 2) {
      xAxisLabel = child.querySelector([
        'p[data-aue-prop="xAxisLabel"]',
      ])?.textContent;
      child.style.display = 'none';
    } else if (i === 3) {
      chartType = child.querySelector([
        'p[data-aue-prop="chartType"]',
      ])?.textContent;
      child.style.display = 'none';
    }
  });

  const API_URL = new URL(relativeJSONPath, window.location.href);

  console.log(relativeJSONPath, yAxisLabel, xAxisLabel, chartType);

  // await waitForChartJS();
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  canvas.width = 800;
  canvas.height = 400;
  const chartJSON = await getChartJSON(API_URL);
  console.log(JSON.stringify(chartJSON));
  // block.textContent = JSON.stringify(chartJSON);
  block.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  // Prepare labels and datasets
  const labels = chartJSON.map((item) => item.name);
  const rexultiData = chartJSON.map((item) => item.rexulti);
  const placeboData = chartJSON.map((item) => item.placebo);
  // Chart config
  const config = {
    type: chartType,
    data: {
      labels,
      datasets: [
        {
          label: 'Rexulti',
          data: rexultiData,
          backgroundColor: 'rgba(118, 155, 205)',
          borderColor: 'rgba(118, 155, 205)',
          borderWidth: 1,
        },
        {
          label: 'Placebo',
          data: placeboData,
          backgroundColor: 'rgba(136, 136, 136)',
          borderColor: 'rgba(136, 136, 136)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: false, // because values are negative
          ticks: {
            font: {
              size: 14,
              family: 'Roboto',
              weight: 'bold',
            },
          },
        },
        y: {
          beginAtZero: false, // because values are negative
          title: {
            display: true,
            text: 'Aggressive Behaviors',
            font: {
              size: 14,
              family: 'Roboto',
              weight: 'bold',
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Behavioral Changes: Rexulti vs Placebo',
          font: {
            size: 14,
            family: 'Roboto',
            weight: 'bold',
          },
        },
        legend: {
          display: true,
          position: 'bottom',
          align: 'start',
        },
      },
    },
  };
  // Render char
  // document.onload = () => {
  //   new Chart(ctx, config);
  // };
  new Chart(ctx, config);
}
