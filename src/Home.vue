<template>
  <el-container class="index-con">
    <el-aside :class="show_class">
      <!-- 左侧菜单栏 -->
      <AsideMenu/>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
        <!-- 顶部菜单栏 -->
        <NavCon/>
      </el-header>
      <el-main clss="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import NavCon from "./components/Navcon";
  import AsideMenu from "./components/AsideMenu";
  export default {
    name: 'home',
    data() {
      return {
        show_class: 'aside-show',
        show_type: false
      }
    },

    // 注册组件
    components: {
      AsideMenu,
      NavCon
    },

    // 方法
    methods: {

    },

    created() {
      // 注册监听事件, 子组件向父组件发送event
      this.$root.Bus.$on('toggle', value => {
        if (value) {
          this.show_class = 'aside-show'
        } else {
          setTimeout(() => {
            this.show_class = 'aside'
          }, 300)
        }
      })
    }

  }
</script>

<style >
  .index-con {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }

  .aside {
    width: 64px !important;
    height: 100%;
    background-color: #334157;
    margin: 0px;
  }
  .aside-show {
    width: 240px !important;
    height: 100%;
    background-color: #334157;
    margin: 0px;
  }
  .index-header,
  .index-main {
    padding: 0px;
    border-left: 2px solid #333;
  }
</style>

