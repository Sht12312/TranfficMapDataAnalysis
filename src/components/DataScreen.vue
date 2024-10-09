<template>
    <div class="container">
      <div class="column left">
        <div class="box">左上</div>
        <div class="box">左中</div>
        <div class="box">左下</div>
      </div>
      <div class="column center">
        <div class="box large">中</div>
        <div class="box small">中下</div>
      </div>
      <div class="column right">
        <div class="box">右上</div>
        <div class="box">右中</div>
        <div class="box">右下</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "DataScreen",
    setup() {},
  };
  </script>
  
  <style scoped>

  .container {display: flex;background-image: url('@/assets/gif/background.gif');background-size: cover;}
  
  .column {flex: 1;display: flex;flex-direction: column;}
  
  .left .box,
  .right .box {flex: 1;}
  
  .center .large {flex: 2;}
  
  .center .small {flex: 1;}
  
  .dialog {
            position: relative;
            font-size: 20px;
            text-shadow: 0 10px 12px #001025;
            width: 300px;
            height: 350px;
        }

  .box {
    margin: 5px;
    border-radius: 10px;
    padding-top: 12%;
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
            background:#05286C;
            font-size: 14px;
            position: absolute;
            top: 0;
            left: 32%;
            padding: 4px 0px;
            color: #19E8FE;
            border-radius: 0 0 10px 10px;

        } 



  </style>
  