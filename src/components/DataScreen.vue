<template>
    <div class="container">
      <div class="column left">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
      </div>
      <div class="column center">
        <div class="box large" id="ChinaMap"></div>
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
  
        
      };
  
      const initCanvas = () => {
        const canvas = document.createElement('canvas');
        canvas.id = "mycanvas";
        canvas.style.position = "absolute";
        canvas.style.zIndex = "-2";
        canvas.style.backgroundColor = "black";
        document.body.prepend(canvas);
        
        let w = window.innerWidth;
        let h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
  
        const ctx = canvas.getContext('2d');
  
        function Build() {
          this.ctx = ctx;
          this.counts = 3000;
          this.maxSize = 4;
          this.halfWidth = w / 2;
          this.halfHeight = h / 2;
          this.arr = [];
        }
        Build.prototype.add = function(coor) {
          var grd = this.ctx.createRadialGradient(coor.x, coor.y, coor.size / 2, coor.x, coor.y, coor.size);
          grd.addColorStop(0, "white");
          grd.addColorStop(1, coor.color);
          this.ctx.fillStyle = grd;
          this.ctx.beginPath();
          this.ctx.arc(coor.x, coor.y, coor.size, 0, Math.PI * 2, true);
          this.ctx.transform(1, 0, 0, 1, 0, coor.z);
          this.ctx.closePath();
          this.ctx.fill();
        };
        Build.prototype.init = function() {
          this.run();
          this.render();
          this.animate();
        };
        Build.prototype.run = function() {
          let nums = 0;
          while (nums < this.counts) {
            const coor = {
              x: Math.ceil(Math.random() * w),
              y: Math.ceil(Math.random() * h),
              posx: Math.random() * w - this.halfWidth,
              posy: Math.random() * h - this.halfHeight,
              fl: 100,
              speed: Math.random() * 2,
              posz: Math.random() * 250,
              r: Math.ceil(Math.random() * this.maxSize),
              color: `rgba(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.random()})`
            };
            this.arr.push(coor);
            nums++;
          }
        };
        Build.prototype.clear = function() {
          ctx.clearRect(0, 0, w, h);
        };
        Build.prototype.render = function() {
          this.clear();
          for (const item of this.arr) {
            this.draw(item);
          }
        };
        Build.prototype.animate = function() {
          this.render();
          requestAnimationFrame(() => this.animate());
        };
        Build.prototype.draw = function(item) {
          if (item.posz > -item.fl) {
            const scale = item.fl / (item.fl + item.posz);
            item.x = this.halfWidth + item.posx * scale;
            item.y = this.halfHeight + item.posy * scale;
            item.size = item.r * scale;
            item.posz -= item.speed;
          } else {
            item.posz = Math.random() * 250;
          }
          this.add(item);
        };
  
        const app = new Build();
        app.init();
  
        window.addEventListener('resize', () => {
          canvas.width = w = window.innerWidth;
          canvas.height = h = window.innerHeight;
        });
      };
  
      onMounted(() => {
        initCanvas();
        initCharts();
      });
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    position: relative; /* Ensure content is above canvas */

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
  .left .box, .right .box {
    flex: 1;
  }
  .center .large {
    flex: 2;
    display: flex;
    background-size: cover;
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
  