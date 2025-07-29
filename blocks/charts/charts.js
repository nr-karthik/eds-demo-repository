// import Chart from 'chart.js/auto';

const API_URL = 'https://mocki.io/v1/257fd7fc-f7af-4dbd-8396-27923afbd0aa';

async function getChartJSON() {
	return fetch(API_URL).then((response) => response.json());
}

export default async function decorate(block) {
	const chartJSON = await getChartJSON();
	block.textContent = JSON.stringify(chartJSON);
	console.log('Charts block is not implemented yet.');
	console.log(block);
}