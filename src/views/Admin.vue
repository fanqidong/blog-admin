<template>
  <div class="layout">
    <header class="header shadow flex-between align-center">
      <i class="el-icon-s-unfold submenu-icon" @click="openMenu"></i>
      <div class="intro">旅途与画</div>
      <ul class="user-bar flex-center">
        <li class="user-avatar align-center">
          <img src="../assets/img/avatar.png" alt>
        </li>
        <li class="align-center">
          <el-dropdown class="user-info" @command="handleCommand">
            <span class="el-dropdown-link user-name">
              樊启东
              <i class="el-icon-arrow-down el-icon--right arrow"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" command="info">基本信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-lock" command="edit">修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="btn-logout align-center font20">
          <i class="el-icon-switch-button" title="退出系统" @click="logout"></i>
        </li>
      </ul>
    </header>
    <!-- 移动端菜单 -->
    <div class="menu-mask" @click="closeMenu" v-if="isMenuShow">
      <aside class="side side-menu mobile-menu">
        <div class="site-logo">
          <img :src="logo" alt>
        </div>
        <ul class="menu-list">
          <li v-for="menu in menuList" :key="menu.id" class="menu-item">
            <router-link :to="menu.path" class="flex-center" active-class="active">
              <i :class="[menu.icon,'menu-icon']"></i>
              <span>{{menu.title}}</span>
            </router-link>
          </li>
        </ul>
      </aside>
    </div>
    <!-- pc 菜单 -->
    <aside class="side side-menu pc-menu">
      <div class="site-logo">
        <img :src="logo" alt>
      </div>
      <ul class="menu-list">
        <li v-for="menu in menuList" :key="menu.id" class="menu-item">
          <router-link :to="menu.path" class="flex-center" active-class="active">
            <i :class="[menu.icon,'menu-icon']"></i>
            <span>{{menu.title}}</span>
          </router-link>
        </li>
      </ul>
    </aside>
    <main class="main-content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import logo from '../assets/img/logo.png';
export default {
  data() {
    return {
      logo,
      isMenuShow: false,
      menuList: [
        {
          id: 0,
          path: '/admin/postArticle',
          title: '文章发布',
          icon: 'el-icon-edit'
        },
        {
          id: 1,
          path: '/admin/mood',
          title: '心情发布',
          icon: 'el-icon-star-off'
        },
        {
          id: 2,
          path: '/admin/article',
          title: '文章管理',
          icon: 'el-icon-takeaway-box'
        },
        {
          id: 3,
          path: '/admin/notice',
          title: '公告管理',
          icon: 'el-icon-info'
        },
        {
          id: 4,
          path: '/admin/picture',
          title: '图片管理',
          icon: 'el-icon-picture-outline'
        }
      ]
    };
  },
  methods: {
    openMenu() {
      this.isMenuShow = true;
    },
    closeMenu() {
      this.isMenuShow = false;
    },
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    logout() {
      this.$confirm('确定退出系统吗？', '系统操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$notify({
            title: '提示',
            message: '退出成功',
            type: 'success',
            duration: 2000
          });
          this.$router.replace('/');
        })
        .catch(() => {
          this.$notify({
            title: '提示',
            type: 'warning',
            message: '取消退出系统'
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 40px 0 160px;
  background: #fff;
  z-index: 1999;
  transition: all 0.3s;
  transform: translateZ(0);
  .intro {
    font-size: 30px;
  }
}
.submenu-icon {
  display: none;
}
.menu-mask {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1999;
  transition: all 0.3s;
}
.side {
  &-menu {
    position: fixed;
    left: 0;
    top: 0;
    width: 150px;
    height: 100%;
    padding-top: 6px;
    font-size: 16px;
    background: #15171c;
    z-index: 2000;
    transition: all 0.3s;
  }
  .menu {
    &-list {
      padding: 20px 20px 0;
    }
    &-item {
      height: 50px;
      a {
        color: rgb(200, 205, 220);
        &.active {
          color: #fff;
        }
        &:hover {
          color: #fff;
        }
      }
    }
    &-icon {
      display: none;
      width: 19px;
      height: 18px;
      margin-right: 6px;
    }
  }
}
.user {
  &-bar {
    height: 100%;
    color: #000;
    li {
      height: 100%;
      cursor: pointer;
    }
  }
  &-info {
    position: relative;
    min-width: 100px;
    margin: 0 10px;
  }
  &-avatar {
    img {
      display: block;
      height: 46px;
      border-radius: 50%;
    }
  }
}
.main-content {
  position: absolute;
  top: 60px;
  left: 150px;
  right: 0;
  padding: 20px;
  transition: all 0.3s;
}
@media (max-width: 980px) {
  .header {
    padding-left: 0;
    padding-right: 10px;
    .intro {
      margin: auto;
      font-size: 24px;
    }
  }
  .user-info {
    min-width: initial;
  }
  .side-menu {
    display: none;
    &.mobile-menu {
      display: block;
    }
  }
  .submenu-icon {
    display: block;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 28px;
  }
  .main-content {
    left: 0;
    width: 100%;
    padding: 10px;
  }
  .mood-edit {
    width: 100%;
  }
}
</style>

