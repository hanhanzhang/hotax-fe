<template>
  <el-menu default-active="2" :collapse="collapsed" collapse-transition :default-active="$route.path"
           :router="true" unique-opened class="el-menu-vertical-demo" background-color="#334157"
           text-color="#fff" active-text-color="#ffd04b">

    <div class="logo-box">
      <img class="logo-img" src="../assets/img/logo.png" alt="">
      <span>电子数据平台</span>
    </div>

    <NavMenu :nav_menus="menus"/>
  </el-menu>
</template>

<script>
  import NavMenu from "./NavMenu";
  import {got_system_menus} from "../utils/utils";

  export default {
    name: 'AsideNavMenu',
    components: {NavMenu},
    data() {
      return {
        collapsed: false,
        menus: []
      }
    },
    async created() {
      this.menus = await got_system_menus();
      // 监听
      this.$root.Bus.$on('toggle', value => {
        this.collapsed = !value
      })
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
    text-align: left;
  }
  .el-menu--collapse  .el-submenu__title span{
    display: none;
  }
  .el-menu--collapse  .el-submenu__title .el-submenu__icon-arrow{
    display: none;
  }
  .logo-box {
    height: 40px;
    line-height: 40px;
    color: #9d9d9d;
    font-size: 20px;
    text-align: center;
    padding: 20px 0px;
  }
  .logo-img {
    height: 40px;
  }
</style>
