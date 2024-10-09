<template>
    <div class="detail">
      <div class="direction2" style="font">点击地图显示坐标</div>
      <div class="coordinates">
      <div class="direction">经度: <span>{{ longitude !== null ? longitude.toFixed(3) : '未知' }}</span></div>
      <div class="direction">纬度: <span>{{ latitude !== null ? latitude.toFixed(3) : '未知' }}</span></div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Detail',
    props: {
      latitude: {
        type: Number,
        default: null
      },
      longitude: {
        type: Number,
        default: null
      }
    },
    setup(props) {
    }
  };
  </script>

<style>
.detail {

    border-width: 10px; 
    border-style: solid;
    border-image: linear-gradient(270deg, #00ffb3, #00b7ff, #00ffb3); 
    border-image-slice: 1;
    border-radius: 50px; 
    padding: 20px; 
    margin: 10px;
    animation: gradient-border 5s ease infinite; 
    overflow: hidden; 
}

@keyframes gradient-border {
    0% {
        border-image-source: linear-gradient(270deg, #00ffb3, #00b7ff, #00ffb3);
    }
    50% {
        border-image-source: linear-gradient(270deg, #00b7ff, #00ffb3, #00ffb3);
    }
    100% {
        border-image-source: linear-gradient(270deg, #00ffb3, #00b7ff, #00ffb3);
    }
}
.coordinates {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.direction {
  border-width: 10px;
  border: 5px solid rgb(0, 247, 255);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px;
  padding: 5px;
  flex: 1; 
}

.direction2 {
  height: 5%;
  border: 5px solid rgb(0, 226, 125);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px;
}

</style>
