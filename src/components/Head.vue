<template>
    <div>
      <div class="header">
        <div class="box">
          <div>
            <img src="@/assets/img/pni.png" @click="gotoHome" style="transform: scale(0.5);">
          </div>
          <nav>
            <button class="btnblack" @click="gotoHome">主页</button>
              <button class="btnwhite" @click="gotoMap">地图</button>
          </nav>
        </div>
  
        <div class="box" style="margin-right: 60px;">
          <nav>
            <el-dropdown v-if="isLoggedIn" @command="handleCommand">
              <el-button type="text" class="user-avatar-button">
                <img :src="userAvatarUrl" class="user-avatar" style="height: 60px; width: 60px; cursor: pointer;">
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="profile">个人中心</el-dropdown-item>
                  <el-dropdown-item command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <div v-else>

            </div>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { ElDropdown, ElButton, ElDropdownMenu, ElDropdownItem } from 'element-plus';
  
  export default {
    name: "Head",
    components: {
      ElDropdown,
      ElButton,
      ElDropdownMenu,
      ElDropdownItem,
    },
    setup() {
      const router = useRouter();
      const userAvatarUrl = 'path/to/default/avatar.png'; // 默认头像路径
  
      const gotoHome = () => {
        router.push({ name: 'Home' });
      };
  
      const gotoMap = () => {
        router.push({ name: 'Map' });
      };
  
      const handleCommand = (command) => {
        if (command === 'profile') {
          router.push({ name: 'UserProfile' });
        } else if (command === 'logout') {
          // 处理登出逻辑
          console.log("用户已登出");
          gotoHome();
        }
      };
  
      onMounted(() => {
        // 任何额外的设置
      });
  
      return {
        gotoHome,
        gotoMap,
        handleCommand,
        userAvatarUrl
      };
    }
  };
  </script>
  
<style scoped>
@import url(../assets/css/buttonblack.css);
@import url(../assets/css/buttonwhite.css);
.header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100px;
      background: linear-gradient(to right, #00ffb3, #00b7ff); /* 渐变色 */
      color: #000000; /* 文字颜色为黑色 */
  }
  
.box {
    display: flex;
    align-items: center;
}

img {
    height: 150px;
    width: 200px;
    object-fit: cover; /* 确保图片保持比例填充 */
}

nav a {
    padding: 0 15px;
    text-decoration: none;
    color: #000000;
    font-size: 16px;
    font-weight: normal;
    opacity: 0.9;
    transition: opacity 0.3s ease-in-out; /* 添加过渡效果 */
}

nav a:hover {
    opacity: 1;
}

.textOne {
    font-size: 20px;
}

.user-avatar-button {
    display: flex;
    align-items: center;
}

.user-avatar {
    border-radius: 50%; /* 圆形头像 */
    object-fit: cover; /* 确保头像保持比例填充 */
    margin-right: 10px;
}

.el-dropdown-menu {
    width: 150px; /* 调整菜单宽度 */
}

.el-dropdown-item {
    font-size: 16px; /* 调整字体大小 */
}
</style>
  