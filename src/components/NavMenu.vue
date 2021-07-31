<template>
  <div class="nav_menu">
    <label v-for="nav_menu in this.nav_menus">
      <!-- 当菜单不存在孩子节点时 -->
      <el-menu-item v-if="nav_menu.children == null || (nav_menu.children && nav_menu.children.length ===0)"
                    :key="nav_menu.id"
                    :index="nav_menu.name"
                    :route="nav_menu.url">
        <i class="iconfont" :class="nav_menu.icon"/>
        <span> {{ nav_menu.name }} </span>
      </el-menu-item>

      <!-- 当菜单存在孩子节点时, 递归调用该组件 -->
      <el-submenu v-if="nav_menu.children && nav_menu.children.length !== 0"
                  :key="nav_menu.id"
                  :index="nav_menu.name">
        <template slot="title">
          <i class="iconfont" :class="nav_menu.icon"/>
          <span> {{nav_menu.name}}</span>
        </template>
        <el-menu-item-group>
          <!-- 递归调用 -->
          <NavMenu :nav_menus="nav_menu.children"/>
        </el-menu-item-group>
      </el-submenu>
    </label>
  </div>
</template>

<script>

  export default {
    name: 'NavMenu',
    // 定义组件属性, 父组件通过属性传值
    //
    props: ['nav_menus'],
    data() {
      return {

      }
    },
    methods: {}
  }

</script>

<style scoped>

</style>
