<template>
	<div id="billLine" :style="{ width: '100%', height: '700%' }"></div>
</template>
<script>
import * as echarts from 'echarts';
import { GetBillStackedLine } from '../../../src/api/api.js';

export default {
	mounted() {
		this.getLineCharts();
	},
	methods: {
		getLineCharts() {
			var serie = new Array();
			GetBillStackedLine().then((res) => {
				var data = res.data;
				var billType = data.billType;
				var billDate = data.billDate;
				var billStackedLineType = data.billStackedLineType;
				console.log(data);
				billStackedLineType.forEach((element) => {
					var ob = new Object();
					var priceArr = element.billStackedLineData;
					ob.name = element.billType;
					ob.type = 'line';
					ob.data = priceArr;
					serie.push(ob);
				});
				var dom = document.getElementById('billLine');
				var myChart = echarts.init(dom, null, {
					renderer: 'canvas',
					useDirtyRect: false,
				});
				var app = {};

				var option;

				option = {
					title: {
						text: 'Stacked Line',
					},
					tooltip: {
						trigger: 'axis',
					},
					legend: {
						data: billType,
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true,
					},
					// toolbox: {
					//   feature: {
					//     saveAsImage: {}
					//   }
					// },
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: billDate,
					},
					yAxis: {
						type: 'value',
					},
					series: serie,
				};
				console.log(option);
				if (option && typeof option === 'object') {
					myChart.setOption(option);
				}
			});
		},
	},
};
</script>
