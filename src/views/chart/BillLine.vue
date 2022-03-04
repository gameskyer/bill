<template>
  <div id="billLine" :style="{ width: '100%', height: '500%' }"></div>

</template>
<script>
import * as echarts from 'echarts';

export default {
  mounted () {
    this.getLineCharts()
  },
  methods: {
    getLineCharts () {
      var chartDom = document.getElementById('billLine');
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      };

      option && myChart.setOption(option);

    }
  }
}



</script>

