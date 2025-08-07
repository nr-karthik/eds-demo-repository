async function getChartJSON(API_URL) {
  return fetch(API_URL).then((response) => response.json());
}

export default async function decorate(block) {
  let relativeJSONPath = null;
  let yAxisLabel = null;
  let xAxisLabel = null;
  let chartType = null;
  let chartTitle = null;

  // Get all child elements of block
  Array.from(block.children).forEach((child, i) => {
    if (i === 0) {
      relativeJSONPath = child.querySelector('a').getAttribute('href');
      child.style.display = 'none';
    } else if (i === 1) {
      chartTitle = child.querySelector([
        'p[data-aue-prop="chartTitle"]',
      ])?.textContent;
      child.style.display = 'none';
    } else if (i === 2) {
      yAxisLabel = child.querySelector([
        'p[data-aue-prop="yAxisLabel"]',
      ])?.textContent;
      child.style.display = 'none';
    } else if (i === 3) {
      xAxisLabel = child.querySelector([
        'p[data-aue-prop="xAxisLabel"]',
      ])?.textContent;
      child.style.display = 'none';
    } else if (i === 4) {
      chartType = child.querySelector([
        'p[data-aue-prop="chartType"]',
      ])?.textContent;
      child.style.display = 'none';
    }
  });

  // await waitForChartJS();
  const API_URL = new URL(relativeJSONPath, window.location.href);
  const chartJSON = await getChartJSON(API_URL);
  console.log(chartJSON.data);
  console.log(chartTitle, relativeJSONPath, yAxisLabel, xAxisLabel, chartType);

  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  canvas.width = 800;
  canvas.height = 400;
  block.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let config = null;

  if (chartType === 'bar') {
    // Prepare labels and datasets
    const labels = chartJSON.data.map((item) => item['Label Name']);
    const rexultiData = chartJSON.data.map((item) => item.Rexulti);
    const placeboData = chartJSON.data.map((item) => item.Placebo);

    // Chart config
    config = {
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
        responsive: true,
        maintainAspectRatio: true,
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
              text: yAxisLabel,
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
            text: chartTitle,
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
  }

  if (chartType === 'line') {
    const labels = chartJSON.data
      .filter((item) => item.name === '-13.3')
      .map((item) => item.dataset_1);

    const groupByName = (name) =>
      chartJSON.data
        .filter((item) => item.name === name)
        .map((item) => item.dataset_2);

    console.log(labels, groupByName('-13.3'), groupByName('-20'));

    // Chart config
    config = {
      type: chartType,
      data: {
        labels,
        datasets: [
          {
            label: '-13.3',
            data: groupByName('-13.3'),
            backgroundColor: 'rgba(118, 155, 205)',
            borderColor: 'rgba(118, 155, 205)',
            borderWidth: 1,
          },
          {
            label: '-20.0',
            data: groupByName('-20'),
            backgroundColor: 'rgba(136, 136, 136)',
            borderColor: 'rgba(136, 136, 136)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Week',
              font: {
                weight: 'bold',
                size: 14,
              },
            },
            ticks: {
              font: {
                size: 14,
                family: 'Roboto',
                weight: 'bold',
              },
            },
          },
          y: {
            title: {
              display: true,
              text: 'LS mean change in PANSS total score',
              font: {
                size: 14,
                family: 'Roboto',
                weight: 'bold',
              },
            },
            reverse: true,
            beginAtZero: false, // because values are negative
          },
        },
        plugins: {
          title: {
            display: true,
            text: chartTitle,
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
  }

  new Chart(ctx, config);
}
