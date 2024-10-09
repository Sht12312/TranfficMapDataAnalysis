<template>
    <div class="container">
      <div class="column left">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
      <div class="column center">
        <div class="box large" id="ChinaMap">
          <!-- <div id="ChinaMap"></div> -->
        </div>
        <div class="box small"></div>
      </div>
      <div class="column right">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import { onMounted } from 'vue';
  import zhongguo from "@/assets/mapjson/zhongguo.json";
  
  export default {
    name: "DataScreen",
    setup() {
      const initCharts = () => {
        const chartDom = document.getElementById('ChinaMap');
        const ChinaMap = echarts.init(chartDom);
        const option = {
          tooltip: {
            show: true,
            trigger: 'item',
            alwaysShowContent: false,
            backgroundColor: '#0C121C',
            borderColor: 'rgba(0,0,0,0.16);',
            hideDelay: 100,
            triggerOn: "mousemove",
            enterable: true,
            textStyle: {
              color: "#DADADA",
              fontSize: "12",
              width: 40,
              height: 60,
              overflow: "break"
            },
            showDelay: 100
          },
          geo: {
            map: "china",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                },
              },
              emphasis: {
                textStyle: {
                  color: '#fff',
                },
              },
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(147,235,248,1)',
                borderWidth: 1,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(147,235,248,0)',
                    },
                  ],
                  globalCoord: false
                },
                shadowColor: 'rgba(128,217,248,1)',
                shadowOffsetX: -2,
                shadowOffsetY: 2,
                shadowBlur: 10,
              },
              emphasis: {
                areaColor: '#389BB7',
                borderWidth: 0
              },
            },
          },
        };
        echarts.registerMap("china", zhongguo);
        ChinaMap.setOption(option);

        window.addEventListener('resize', () => {
          ChinaMap.resize();
        });
      };
  
      onMounted(async () => {
        const ChinaDom = document.getElementById('ChinaMap');
        console.log(ChinaDom);
        initCharts();
      });
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;

        background-color: #000e29;
    background-size: cover;
  }
  
  .left {
    flex: 2;
  }
  .right {
    flex: 2;
  }
  .center {
    flex: 3;
  }

  .column {

    display: flex;
    flex-direction: column;
  }
  
  .left .box,
  .right .box {
    flex: 1;
  }
  
  .center .large {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .center .small {
    flex: 1;
  }
  
  .box {
    margin: 5px;
    border-radius: 10px;
    padding: 0; 
    background: linear-gradient(to left, #2CD5FF, #2CD5FF) left top no-repeat,
                linear-gradient(to bottom, #2CD5FF, #2CD5FF) left top no-repeat,
                linear-gradient(to left, #2CD5FF, #2CD5FF) right top no-repeat,
                linear-gradient(to bottom, #2CD5FF, #2CD5FF) right top no-repeat,
                linear-gradient(to left, #2CD5FF, #2CD5FF) left bottom no-repeat,
                linear-gradient(to bottom, #2CD5FF, #2CD5FF) left bottom no-repeat,
                linear-gradient(to left, #2CD5FF, #2CD5FF) right bottom no-repeat,
                linear-gradient(to left, #2CD5FF, #2CD5FF) right bottom no-repeat;
    background-size: 4px 20px, 20px 4px, 4px 20px, 20px 4px;
    border: 1px solid #073F97;
    position: relative;
  }
  .box span {
    display: inline-block;
    width: 35%;
    background: #05286C;
    font-size: 14px;
    position: absolute;
    top: 0;
    left: 32%;
    padding: 4px 0px;
    color: #19E8FE;
    border-radius: 0 0 10px 10px;
  }
  </style>
  