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

      const mapOptions = {
        center: [32.0, 117.0],
        zoom: 13,
        minZoom: 8,
        maxZoom: 18,
        zoomControl: true,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true,
        attributionControl: false,
        zoomAnimation: true,
        fadeAnimation: true,
      };

      map.value = L.map('map', mapOptions);

      // 添加离线瓦片图层
      const tileLayerOptions = {
        minZoom: 8,
        maxZoom: 15,
        tileSize: 256,
        zoomOffset: 0,
        subdomains: ['a', 'b', 'c'],
        errorTileUrl: '/path/to/error/tile.png',
        attribution: '© Your Attribution Here',
      };

      L.tileLayer('/mapabc/roadmap/{z}/{x}/{y}.png', tileLayerOptions).addTo(map.value);

      // 定义多个标记地点，添加时间信息
      const locations = [
        { coords: [32.0, 117.0], name: '地点 1', time: '2024-10-01 10:00' },
        { coords: [32.1, 117.1], name: '地点 2', time: '2024-10-02 11:00' },
        { coords: [32.2, 117.2], name: '地点 3', time: '2024-10-03 12:00' },
      ];

      // 创建一个数组来保存标记
      const markers = locations.map(location => {
        const popupContent = `
          <strong>${location.name}</strong><br />
          经纬度: ${location.coords[0]}, ${location.coords[1]}<br />
          时间: ${location.time}
        `;

        const marker = L.marker(location.coords);
          marker.bindPopup(popupContent); // 绑定弹出内容
          return marker; // 返回标记
        });

        // 将所有标记添加到地图上
        markers.forEach(
          
        marker => {
          console.log("marker",marker)
          marker.addTo(map.value)
        });

      // 示例标记
      L.marker([32.0, 117.0]).addTo(map.value)
        .bindPopup('我叫王载风，现在是时间：2024年10月7日，我标记了一处地点')
        .openPopup();
    });

    return { map };
  },
};
</script>

<style>
.map {
  height: 100vh; /* 设置地图高度 */
  width: 100%;
}
</style>
