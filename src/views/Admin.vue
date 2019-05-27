
<template>
    <div class="layout admin">
        <header class="admin-header flex-between flex-center">
            <div class="btn-collapse">
                <img src="http://v3.saas.laiketui.com/application/images/iIcon/shouqi.png" alt="">
            </div>
            <div class="admin-info flex-center">
              <div class="user-info flex-center">
                  <img src="../assets/img/admin_logo.jpg" alt="" class="user-avatar">
                  <div class="user-name">
                      <span>Hi!欢迎</span>
                      <span>樊启东</span>
                  </div>
              </div>
              <div class="btn-logout is-href" @click="logout">
                  <img src="http://v3.saas.laiketui.com/application/images/iIcon/tcl.png" alt="">
              </div>
            </div> 
        </header>
        <aside class="admin-aside">
            <div class="admin-intro">
                <img src="../assets/img/logo.png" alt="">
            </div>
            <div class="menu-list">
                <div class="menu-item flex-center">
                    <span class="menu-icon">
                        <img src="https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1553768997927.png" alt="">
                    </span>
                    <router-link tag="span" to="/admin/article">文章管理</router-link>
                </div>
                <div class="menu-item flex-center">
                    <span class="menu-icon">
                        <img src="https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1553768997927.png" alt="">
                    </span>
                    <router-link tag="span" to="/admin/picture">图片管理</router-link>
                </div>
                <div class="menu-item flex-center">
                    <span class="menu-icon">
                        <img src="https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1553768997927.png" alt="">
                    </span>
                    <router-link tag="span" to="/admin/notice">公告管理</router-link>
                </div>
                <div class="menu-item flex-center">
                    <span class="menu-icon">
                        <img src="https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1553768997927.png" alt="">
                    </span>
                    <router-link tag="span" to="/admin/mood">心情发表</router-link>
                </div>
            </div>
        </aside>
        <main class="main-content">
            <router-view></router-view>
        </main>
        <Modal
            v-model="modal"
            title="确定退出吗？"
            @on-ok="ok"
            @on-cancel="cancel">
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isCollapsed: false,
                modal:false
            };
        },
        computed: {
            
        },
        methods:{
            // 退出登录
            logout(){
                this.modal = true
            },
             ok () {
                this.$router.replace({path: '/'});
                this.$Message.info('退出成功');
            },
            cancel () {
                this.$Message.info('已取消登录');
            }
        }
    }
</script>
<style lang="scss" scoped>
.admin{
    min-height: 100%;
    background: #f4f5f5;
    &-aside{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 150px;
        padding: 2px 0 0 0;
        font-size: 16px;
        background: #343B4A;
        color: rgb(200, 205, 220);
        z-index: 999;
    }
    .menu{
        &-icon{
            width: 18px;
            margin-right: 4px;
        }
        &-list{
            padding: 10px 0 0 0;
        }
          &-item{
            height: 50px;
            padding: 10px 0;
            cursor: pointer;
        }
    }
    &-header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        padding: 0 40px 0 180px;
        background: #fff;
        z-index: 999;
    }
    .user{
        &-avatar{
            width: 44px;
            border-radius: 50%;
        }
        &-name{
            margin: 0 10px;
        }
    }
    .main-content{
        position: relative;
        margin-left: 150px;
        padding-top: 50px;
        overflow-y: auto;
    }
}
</style>

