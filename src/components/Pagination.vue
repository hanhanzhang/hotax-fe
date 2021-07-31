<template>
  <el-pagination class="page-box"
                 @size-change="handle_page_changed"
                 @current-change="handle_current_page_changed"
                 background
                 :current-page="page_infos.current_page"
                 :page-sizes="[10, 20, 30, 40]"
                 :page-size="page_infos.page_size"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="page_infos.total">
  </el-pagination>
</template>
<script>

export default {
  name: 'Pagination',

  props: ['page_infos'],

  data() {
    return {
      page_params: {
        current_page: this.page_infos.current_page,
        page_size: this.page_infos.page_size
      }
    }
  },
  created() {},

  methods: {

    handle_page_changed(val) {
      this.page_params.page_size = val;
      this.$emit('on_page_changed', this.page_params)
    },

    handle_current_page_changed(val) {
      this.page_params.current_page = val;
      this.$emit('on_page_changed', this.page_params)
    }
  }
}
</script>

<style>
.page-box {
  margin: 10px auto;
}
</style>
