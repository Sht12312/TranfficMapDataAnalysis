<template>
    <div class="container">
      <Head />
      <div class="content">
        <!-- 传递经纬度给 Detail 组件 -->
        <Detail class="detail" :latitude="latitude" :longitude="longitude" />
        <Map class="map" @map-click="handleMapClick" /> <!-- 监听 map-click 事件 -->

      </div>
    </div>
  </template>
  
  <script>
  import Head from '../components/Head.vue';
  import Map from '../components/map.vue';
  import Detail from '../components/Detail.vue';
  import { ref } from 'vue';
  import axios from 'axios'; // 导入 Axios
  
  export default {
    name: 'Trajectory',
    components: {
      Head,
      Map,
      Detail
    },
    setup() {
      const latitude = ref(null);
      const longitude = ref(null);
  
      // 处理地图点击事件
      const handleMapClick = (coords) => {
        latitude.value = coords.latitude;
        longitude.value = coords.longitude;
  
        // 发送经纬度到服务器
        const payload = {
          longitude: coords.longitude,
          latitude: coords.latitude,
          zoom: coords.zoom
        };
  
      };
  
      return {
        latitude,
        longitude,
        handleMapClick // 返回处理函数
      };
    }
  };
  </script>
  
  <style>
  .container {
    display: grid;
    grid-template-rows: auto 1fr; /* 第一层自动高度，第二层填满剩余空间 */
    height: 98vh; /* 确保容器填满视口高度 */
    overflow: hidden; /* 隐藏滚动条 */
  }
  
  .content {
    display: grid;
    grid-template-columns: 3fr 7fr; /* Detail 占 3 份，Map 占 7 份 */
    grid-template-areas: "detail map";
    height: 100%; /* 确保内容区域填满 */
  }
  
  .map {
    border-radius: 20px; /* 圆角 */
    height: 100%; /* 确保地图填满其容器 */
  }
  
  .detail {
    border-radius: 20px; /* 圆角 */
    height: 100%; /* 确保地图填满其容器 */
  }
  
  .zb {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  </style>
  