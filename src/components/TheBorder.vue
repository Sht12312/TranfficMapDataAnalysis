<template>
    <div class="dialog">
      <span class="dialog-rect"></span>
      <div class="box flex-row j_c">CSS 实现不规则边框（2）</div>
    </div>
  </template>
  
  <script>
  export default {
    name: "IrregularBorderBox",
  };
  </script>
  
  <style scoped>
  :root {
    --w: 353px; /* 宽度 */
    --h: 60px;  /* 高度 */
    --path: polygon(
      10px 0,
      100% 0,
      100% calc(100% - 10px),
      calc(100% - 10px) 100%,
      0 100%,
      0 10px
    ); /* clip-path裁剪形状 */
  }
  
  .dialog {
    position: relative;
  }
  
  .box {
    position: relative;
    width: var(--w);
    height: var(--h);
    border-radius: 6px;
    background: linear-gradient(
      140deg,
      rgba(138, 203, 255, 0.55),
      rgba(41, 106, 143, 0.5),
      rgba(79, 170, 221, 1)
    );
    clip-path: var(--path); /* 进行裁剪 */
    font-size: 20px;
    color: #fff;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.5s;
  }
  
  .box:last-child {
    margin-bottom: 0;
  }
  
  .box:hover {
    filter: brightness(1.5);
  }
  
  .box::after {
    content: "";
    width: calc(100% - 3px);
    height: calc(100% - 3px);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    background: linear-gradient(180deg, #023863 0%, #002d48 100%);
    border-radius: 4px;
    clip-path: var(--path); /* 设置裁剪 */
  }
  
  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  
  .j_c {
    justify-content: center;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  * {
    padding: 0;
    margin: 0;
  }
  
  body {
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #222;
    color: #fff;
    overflow: hidden;
    height: 100vh;
  }
  </style>
  