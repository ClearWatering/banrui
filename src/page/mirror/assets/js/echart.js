import echarts from 'echarts'
const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {
          orderChart: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();

            var option = {
              title: {
                text: data.title,
                x: '25%',
                top: 'center',
                textStyle: {
                  color: '#ffffff',
                  fontSize: 16,
                }
              },
              tooltip: {
                trigger: 'item',
                formatter: '{b}: {c} ({d}%)'
              },
              legend: {
                top: '35%',
                right: '0',
                orient: 'vertical',
                itemWidth: 16,
                itemHeight: 6,
                itemGap: 10,
                barBorderRadius: 5,
                textStyle: {
                  color: '#48a8f4',
                  fontSize: '12',
                  borderRadius: 5
                },
              },
              series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['55%', '75%'],
                center: ['36%', '50%'],
                selectedMode: 'single',
                selectedOffset: 10,
                clockwise: true,
                label: {
                  color: '#FFF',
                  show: true,
                  position: 'outside',
                  formatter: '{d}%',
                },
                labelLine: {
                  //   length: 4,
                  length2: 12,
                  lineStyle: {
                    color: '#fff',
                    fontSize: 10,
                  },
                },

                data: data.data
              }]
            };
            this.chart.setOption(option);
          },
          rateChart: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var colorArray = [

              {
                top: '#6054ff',
                bottom: '#6054ff'
              },
              {
                top: '#0769ea',
                bottom: '#1595fe'
              }, {
                top: '#f6f489', //深蓝
                bottom: '#e4e374'
              },
              {
                top: '#b84bec', //粉
                bottom: '#a237e5'
              },
              {
                top: '#88e9b8', //粉
                bottom: '#47b67d'
              },
              {
                top: '#0fd5f9',
                bottom: '#0487ed'
              },
            ];

            var option = {
              title: {
                text: data.title,
                x: '24%',
                top: 'center',
                textStyle: {
                  color: '#fafeff',
                  fontSize: 16,
                }
              },
              tooltip: {},
              legend: {
                orient: 'vertical',
                right: '12%',
                align: 'left',
                top: 'middle',
                itemWidth: 16,
                itemHeight: 6,
                textStyle: {
                  color: '#48a8f4',
                  fontSize: 12
                },
              },
              series: [{
                  type: 'pie',
                  clockWise: true,
                  radius: ['40%', '90%'],
                  center: ['30%', '50%'],
                  roseType: 'radius',
                  label: {
                    position: 'inner',
                    formatter: '{d}%',
                    fontSize: 10
                  },
                  itemStyle: {
                    normal: {
                      color: function (params) {
                        var num = colorArray.length;
                        return {
                          colorStops: [{
                            offset: 0,
                            color: colorArray[params.dataIndex % num].bottom
                          }, {
                            offset: 1,
                            color: colorArray[params.dataIndex % num].top
                          }]
                        }
                      },
                      shadowColor: 'rgba(0, 0, 0, 0.5)',
                      shadowBlur: 10,

                    },
                  },
                  data: data.data

                }

              ]

            }
            this.chart.setOption(option);
          },
          lineChart: function (id, data) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            var option = {
              title: {
                text: '订单量',
                right: '20',
                top: 'top',
                textStyle: {
                  color: '#fafeff',
                  fontSize: 14,
                }
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow',
                },
              },
              legend: {
                icon: 'rect',
                orient: 'vertical',
                borderRadius: 5,
                tooltip: {
                  show: true
                },
                right: '20',
                align: 'left',
                top: '30',
                itemWidth: 16,
                itemHeight: 6,
                textStyle: {
                  color: '#48a8f4',
                  fontSize: 12
                },
                name: ['移网', '宽带', '融合'],
              },
              grid: {
                left: '6%',
                right: '120',
                top: '5%',
                bottom: '15%'
              },

              xAxis: [{
                name: "日",
                boundaryGap: false,
                type: "category",

                nameTextStyle: {
                  color: "#48a8f4",
                },
                axisLabel: {
                  show: true,
                  color: "#3fabff",
                  fontSize: 12,
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#112364',
                    width: 1
                  }
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#023c7a",
                    width: 1,
                  },

                },
                data: ["08/21", "08/22", "08/23", "08/24", "08/25", "08/26", "08/28", "08/29", "08/30", "08/31"]
              }],
              yAxis: [{
                name: "",
                type: "value",
                gridIndex: 0,
                axisTick: {
                  show: false
                },
                axisLabel: {
                  margin: 20,
                  showMinLabel: true,
                  textStyle: {
                    color: "#48a8f4",
                    fontSize: 12,

                  },
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: '#112364',
                    width: 1
                  }
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: "#023c7a",
                    width: 1,
                  },
                },

                minInterval: 1,
              }, ],
              series: [{
                  name: '移网',
                  type: 'line',
                  symbolSize: 0,
                  lineStyle: {
                    normal: {
                      color: "#04cdf4",
                    },
                  },
                  label: {
                    show: false,
                    position: 'top',
                    textStyle: {
                      color: '#A582EA',
                    }
                  },
                  itemStyle: {
                    color: '#04cdf4',
                    borderColor: "#04cdf4",
                    borderWidth: 2,
                  },
                  data: data.data1
                },
                {
                  name: '宽带',
                  type: 'line',
                  showAllSymbol: true,
                  symbol: 'circle',
                  symbolSize: 0,
                  lineStyle: {
                    normal: {
                      color: "#2e61fa",
                    },
                  },
                  label: {
                    show: false,
                  },
                  itemStyle: {
                    color: "#2e61fa",
                    borderColor: "#2e61fa",
                    borderWidth: 2,
                  },
                  data: data.data2
                },
                {
                  name: '融合',
                  type: 'line',
                  showAllSymbol: true,
                  symbol: 'circle',
                  symbolSize: 0,
                  lineStyle: {
                    normal: {
                      color: "#ca3ff0",
                    },
                  },
                  label: {
                    show: false,
                  },
                  itemStyle: {
                    color: "#ca3ff0",
                    borderColor: "#ca3ff0",
                    borderWidth: 2,
                  },

                  data: data.data3
                },
              ]
            };
            this.chart.setOption(option);
          }


        }
      }
    }
  })
}

export default {
  install,
}
