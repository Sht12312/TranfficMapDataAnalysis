<template>
  <div id="map" class="map"></div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'Map',
  setup() {
    const map = ref(null);

    onMounted(async () => {
      // 修改 Leaflet 的 Popup 原型
      L.Popup.prototype._animateZoom = function (e) {
        if (!this._map) {
          return;
        }
        const pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
              anchor = this._getAnchor();
        L.DomUtil.setPosition(this._container, pos.add(anchor));
      };

      // 创建地图实例
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.log("地图未找到");
        return;
      }
      map.value = L.map('map').setView([32.0, 117.0], 13);

      // 使用 Axios 获取瓦片信息
      try {
        const response = await axios.get('/mapabc/roadmap/8/209/102.png');
        console.log(response.data);
      } catch (error) {
        console.error('请求瓦片失败:', error.response ? error.response.data : error.message);
      }

      // 添加离线瓦片图层
      L.tileLayer('/mapabc/roadmap/{z}/{x}/{y}.png', {
        minZoom: 8,
        maxZoom: 15,
        attribution: '© Your Attribution Here',
      }).addTo(map.value);

      // 添加标记示例
      L.marker([32.0, 117.0]).addTo(map.value)
        .bindPopup('我标记了一处地点')
        .openPopup();
    });

    return { map };
  },
};
</script>

<style scoped>
.map {
  height: 100vh; /* 设置地图高度 */
  width: 100%;
}
</style>
