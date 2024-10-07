<template>
    <div class="detail">
        Hello World
    </div>
</template>

<script>
export default {
    name: 'Detail',
    setup() {
        // 可以在这里添加逻辑
    }
}
</script>

<style>
.detail {
    border-width: 10px; /* 设置边框宽度 */
    border-style: solid; /* 设置边框样式 */
    border-image: linear-gradient(270deg, #00ffb3, #00b7ff, #00ffb3); /* 渐变边框 */
    border-image-slice: 1; /* 切割边框 */
    border-radius: 50px; /* 更大的圆角边框 */
    padding: 20px; /* 内边距 */
    margin: 10px; /* 外边距 */
    animation: gradient-border 5s ease infinite; /* 添加动画 */
    overflow: hidden; /* 确保内容不超出边框 */
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
</style>
