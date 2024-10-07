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
            <div v-else></div>
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

    onMounted(() => {
      // 任何额外的设置
    });

    return {
      gotoHome,
      gotoMap,
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
  background: linear-gradient(270deg, #00ffb3, #00b7ff, #00ffb3);
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
  color: #ffffff;
  border-radius: 20px;
  margin: 0; /* 确保没有外边距 */
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.box {
  display: flex;
  align-items: center;
}

.user-avatar-button {
  display: flex;
  align-items: center;
}

.user-avatar {
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
}

.el-dropdown-menu {
  width: 150px;
}

.el-dropdown-item {
  font-size: 16px;
}
</style>
