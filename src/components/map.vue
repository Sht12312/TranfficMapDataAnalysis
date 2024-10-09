<template>
  <div id="map" class="map"></div>
</template>

<script>
import { onMounted, ref, defineExpose } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'Map',
  setup(props, { emit }) {
    let marker = null;
    const map = ref(null);
    const markers = ref([]); // 存储所有 Shift 添加的标记
    let isShiftPressed = false; // 检测 Shift 是否按下

    onMounted(() => {
      // 修改 Leaflet 的 Popup 原型动画
      L.Popup.prototype._animateZoom = function (e) {
        if (!this._map) return;
        const pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
              anchor = this._getAnchor();
        L.DomUtil.setPosition(this._container, pos.add(anchor));
      };

      // 初始化地图
      map.value = L.map('map', { attributionControl: false }).setView([31.911, 118.911], 13);
      L.tileLayer('/mapabc/roadmap/{z}/{x}/{y}.png', {
        minZoom: 8,
        maxZoom: 15,
        attribution: '© Your Attribution Here',
      }).addTo(map.value);

      // 定义两个不同的图标
      const icon = L.icon({
        iconUrl: require('@/assets/img/marker-icon-2x.png'), 
        iconSize: [32, 52], 
        iconAnchor: [16, 32],
        popupAnchor: [0, -32], 
      });

      const icon2 = L.icon({
        iconUrl : require('@/assets/img/marker02.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34], 
        shadowSize: [41, 41]
      });

      // 地图点击事件
      map.value.on('click', function(e) {
        const latlng = e.latlng;
        const zoom = map.value.getZoom();

        // 触发 Vue 事件，传递点击坐标
        emit('map-click', {
          longitude: latlng.lng,
          latitude: latlng.lat,
          zoom: zoom
        });

        // 如果 Shift 没有按下，添加或更新单个标记
        if (!isShiftPressed) {
          if (marker) {
            marker.setLatLng(latlng).update();
          } else {
            marker = L.marker([latlng.lat, latlng.lng], { icon: icon }).addTo(map.value)
              .bindPopup("经度: " + latlng.lng.toFixed(3) + "<br>纬度: " + latlng.lat.toFixed(3))
              .openPopup();
          }
        }
      });

      // 按住 Shift 时点击添加新标记
      map.value.on('click', function(e) {
        if (isShiftPressed) {
          const latlng = e.latlng;
          const newMarker = L.marker([latlng.lat, latlng.lng], { icon: icon2 }).addTo(map.value)
            .bindPopup("经度: " + latlng.lng.toFixed(3) + "<br>纬度: " + latlng.lat.toFixed(3))
            .openPopup();
          markers.value.push(newMarker); // 将新标记存入数组
        }
      });

      // Shift 键的按下和松开事件监听
      document.addEventListener('keydown', function(e) {
        if (e.key === "Shift") {
          isShiftPressed = true;
        }
      });

      document.addEventListener('keyup', function(e) {
        if (e.key === "Shift") {
          isShiftPressed = false;
        }
      });

      // 右键单击删除最后一个标记
      map.value.on('contextmenu', function() {
        if (markers.value.length > 0) {
          const lastMarker = markers.value.pop();
          map.value.removeLayer(lastMarker);
        }
      });


    });

    defineExpose({
      mapInstance: map 
    });

    return { map };
  },
};
</script>

<style>
.map {
  height: 100vh; 
  width: 100%;
}
</style>
