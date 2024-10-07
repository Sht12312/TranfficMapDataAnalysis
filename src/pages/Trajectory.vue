<template>
    <div class="container">
        <Head />
        <div class="content">
            <Detail class="detail" />
            <Map class="map" />
        </div>
    </div>
</template>

<script>
import Head from '../components/Head.vue';
import Map from '../components/map.vue';
import Detail from '../components/Detail.vue';

export default {
    name: 'Trajectory',
    components: {
        Head,
        Map,
        Detail
    },
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
</style>
