const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);

const API_URL = 'https://mocki.io/v1/257fd7fc-f7af-4dbd-8396-27923afbd0aa';

// Helper to wait for Chart.js to load
function waitForChartJS() {
  return new Promise((resolve) => {
    if (window.Chart) {
      resolve();
    } else {
      script.onload = resolve;
    }
  });
}

async function getChartJSON() {
  return fetch(API_URL).then((response) => response.json());
}

export default async function decorate(block) {
  await waitForChartJS();
  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  canvas.width = 800;
  canvas.height = 400;
  const chartJSON = await getChartJSON();
  block.textContent = JSON.stringify(chartJSON);
  block.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Prepare labels and datasets
  const labels = chartJSON.map((item) => item.name);
  const rexultiData = chartJSON.map((item) => item.rexulti);
  const placeboData = chartJSON.map((item) => item.placebo);

  // Chart config
  const config = {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Rexulti',
          data: rexultiData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Placebo',
          data: placeboData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false, // because values are negative
          title: {
            display: true,
            text: 'Change in Behavior Score',
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: 'Behavioral Changes: Rexulti vs Placebo',
        },
      },
    },
  };

  // Render char
  new Chart(ctx, config);
}
