async function getChartJSON(API_URL) {
  return fetch(API_URL).then((response) => response.json());
}

export default async function decorate(block) {
  let chartConfigPath = null;
  let chartDataPath = null;
  let yAxisLabel = null;
  let xAxisLabel = null;
  let chartType = null;
  let chartTitle = null;

  // Get all child elements of block
  Array.from(block.children).forEach((child, i) => {
    if (i === 0) {
      chartConfigPath = child.querySelector('a').getAttribute('href');
      child.style.display = 'none';
    } else if (i === 1) {
      chartDataPath = child.querySelector('a').getAttribute('href');
      child.style.display = 'none';
    } else if (i === 2) {
      chartTitle = child.querySelector(['p'])?.textContent;
      child.style.display = 'none';
    } else if (i === 3) {
      yAxisLabel = child.querySelector(['p'])?.textContent;
      child.style.display = 'none';
    } else if (i === 4) {
      xAxisLabel = child.querySelector(['p'])?.textContent;
      child.style.display = 'none';
    } else if (i === 5) {
      chartType = child.querySelector(['p'])?.textContent;
      child.style.display = 'none';
    }
  });

  // await waitForChartJS();

  const CONFIG_API_URL = new URL(chartConfigPath, window.location.origin).href;
  const chartConfigJSON = await getChartJSON(CONFIG_API_URL);
  const DATA_API_URL = new URL(chartDataPath, window.location.origin).href;
  const chartDataJSON = await getChartJSON(DATA_API_URL);
  console.log(chartConfigJSON.data, chartDataJSON.data);

  const canvas = document.createElement('canvas');
  canvas.id = 'myChart';
  canvas.width = 800;
  canvas.height = 400;
  block.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let config = null;

  const groupByName = (label) => {
    if (chartType === 'line') {
      return chartDataJSON.data
        .filter((item) => item.name === label)
        .map((item) => item.dataset_2);
    }

    if (chartType === 'bar') {
      return chartDataJSON.data.map((item) => item[label]);
    }

    return '';
  };

  const datasets = chartConfigJSON.data.map((item) => ({
    label: item.label,
    data: groupByName(item.label),
    backgroundColor: item.background_color,
    borderColor: item.background_color,
    borderWidth: 1,
  }));

  console.log(chartType, datasets);

  if (chartType === 'bar') {
    // Prepare labels and datasets
    const labels = chartDataJSON.data.map((item) => item['Label Name']);

    // Chart config
    config = {
      type: chartType,
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
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
    const labels = Array.from(
      new Set(chartDataJSON.data.map((item) => item.dataset_1))
    );

    console.log('Labels', labels);

    // Chart config
    config = {
      type: chartType,
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: xAxisLabel,
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
              text: yAxisLabel,
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
