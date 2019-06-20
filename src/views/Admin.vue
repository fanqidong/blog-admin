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
          <i class="el-icon-switch-button" title="退出系统"></i>
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
            <img class="menu-icon" :src="menu.iconUrl" alt>
            <span>{{menu.title}}</span>
          </router-link>
        </li>
      </ul>
    </aside>
    <main class="admin-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import logo from '../assets/img/logo.png'
export default {
  name: 'Admin',
  data() {
    return {
      logo,
      menuList: [
        {
          id: 1,
          path: '/admin/article',
          title: '文章管理',
          iconUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1553768997927.png'
        },
        {
          id: 2,
          path: '/admin/notice',
          title: '公告管理',
          iconUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1553769084517.png'
        },
        {
          id: 3,
          path: '/admin/mood',
          title: '心情发布',
          iconUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1553768005360.png'
        },
        {
          id: 4,
          path: '/admin/picture',
          title: '图片管理',
          iconUrl: 'https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1553769185257.png'
        }
      ]
    }
  },
  methods: {
    handleCommand(command) {
      this.$message('click on item ' + command)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 800px;
  height: 60px;
  padding: 0 40px 0 150px;
  background: #fff;
  z-index: 999;
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
    z-index: 999;
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
.admin-content {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 150px;
}
</style>

