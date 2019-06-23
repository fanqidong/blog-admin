<template>
  <div class="layout">
    <header class="header shadow flex-between">
      <div class="intro">博客后台管理系统</div>
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
    <aside class="side side-menu">
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
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import logo from '../assets/img/logo.png';
export default {
  data() {
    return {
      logo,
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
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$notify({
            title: '提示',
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
  padding: 0 40px 0 150px;
  background: #fff;
  z-index: 2000;
  .intro {
    padding: 10px 0 0 20px;
    font-size: 30px;
  }
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
      display: block;
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
  padding: 20px;
}
</style>

