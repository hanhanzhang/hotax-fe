<template>
  <el-menu class="el-menu-demo"
           mode="horizontal"
           background-color="#334157"
           text-color="#fff"
           active-text-color="#fff">
    <el-button class="button-img">
      <img class="show-img" :src="collapsed ? img_sq : img_show" @click="toggle()">
    </el-button>
    <el-submenu index="2" class="submenu">
      <template slot="title">管理员</template>
      <el-menu-item @click="content()" index="2-1">个人中心</el-menu-item>
      <el-menu-item @click="exit()" index="2-2">退出系统</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    name: 'NavCon',

    //
    data() {
      return {
        collapsed: true,
        img_show: require('../assets/img/show.png'),
        img_sq: require('../assets/img/sq.png'),
        user: {}
      }
    },

    //
    created() {
      this.user = {}
    },

    //
    methods: {
      // 退出系统
      exit() {

      },

      // 切换显示
      toggle() {
        this.collapsed = !this.collapsed;
        this.$root.Bus.$emit('toggle', this.collapsed)
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
  }
  .submenu {
    float: right;
  }
  .button-img {
    height: 60px;
    background-color: transparent;
    border: none;
  }
  .show-img {
    width: 26px;
    height: 26px;
    position: absolute;
    top: 17px;
    left: 17px;
  }
  .show-img:active {
    border: none;
  }
</style>
