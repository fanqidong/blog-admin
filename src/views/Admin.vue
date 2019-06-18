<template>
  <div class="layout">
    <header class="header">
      <div>头部</div>
    </header>
    <aside class="side side-menu">
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
export default {
  name: 'Admin',
  data() {
    return {
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
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 999;
}
.side {
  &-menu {
    position: fixed;
    left: 0;
    top: 60px;
    width: 150px;
    height: 100%;
    padding: 20px 20px 0;
    font-size: 16px;
    background: #15171c;
  }
  .menu {
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
.admin-content {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 150px;
}
</style>

