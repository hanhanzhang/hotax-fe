<template>
  <div>
    <el-table :data="data" stripe border style="margin-top: 20px; width: 100%;">
      <el-table-column v-for="t in titles" :key="t.prop" :sortable="t.sortable" :prop="t.prop"
                       :label="t.label" :width="t.width"/>
      <el-table-column v-if="has_operator" fixed="right" label="操作" :width="operators.width">
        <template slot-scope="scope">
          <el-button v-for="btn in operators.buttons" :key="btn.label" :type="btn.type"
                     :icon="btn.icon" @click="handle_click(btn.action, scope.row)" >{{btn.label}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      }
    },

    props: ["titles", "has_operator", "operators", "data"],

    methods: {
      handle_click(action, row) {
        // console.log(action);
        // console.log(JSON.stringify(row));
        this.$emit('on_click', action, row);
      }
    }
  }

</script>
