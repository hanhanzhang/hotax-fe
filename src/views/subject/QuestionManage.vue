<template>
  <div>
    <!-- 面包屑: 显示页面路径 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>问项管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 搜索区 -->
    <el-form :inline="true" ref="search" :model="search_form" label-width="90px" style="margin-top: 20px">
      <el-form-item label="问项名称">
        <el-input v-model="search_form.name" placeholder="请输入问项名称" prefix-icon="el-icon-search" />
      </el-form-item>
      <el-form-item label="问项类型">
        <el-select v-model="search_form.type" clearable placeholder="请选择问项类型">
          <el-option v-for="s in questions" :key="s.id" :label="s.name" :value="s.name"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
      <el-button type="primary" icon="el-icon-circle-plus" @click="add()">添加</el-button>
    </el-form>
    <!-- 信息区 -->
    <Table :data="table_settings.data" :titles="table_settings.titles" :has_operator="true"
           :operators="table_settings.operators" @on_click="do_click"/>

    <!-- 课题编辑区 -->
    <el-dialog :title="dialog_title" :visible.sync="show_dialog">
      <el-form ref="update" :rules="update_rules" :model="update_form" label-width="90px">
        <el-form-item v-if="show_question_id" label="问项编号" prop="id">
          <el-input v-model="update_form.id" disabled style="width: 100%;" />
        </el-form-item>
        <el-form-item label="问项名称" prop="name">
          <el-input v-model="update_form.name" :disabled="update_enable" placeholder="请输入表单名称" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="问项类型" prop="type">
          <el-select v-model="update_form.type" clearable placeholder="问项类型" @change="do_change" style="width: 100%">
            <el-option v-for="s in questions" :key="s.id" :label="s.name" :value="s.id  "/>
          </el-select>
        </el-form-item>
        <el-form-item label="问项标题" prop="title">
          <el-input v-model="update_form.title" :disabled="update_enable" placeholder="请输入问项标题" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="问项选项" prop="title">
          <el-input v-model="update_form.option" :disabled="update_enable" :placeholder="option_hit" style="width: 100%;" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-circle-check" @click="do_edit()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import Table from '../../components/CTable'
  import Pagination from "../../components/Pagination";
  import {got_question_table_titles, got_question_types} from "../../http/question";

  export default {
    data() {
      return {
        questions: null,
        // 问项搜索
        search_form: {
          name: null,
          type: null
        },

        // 问项信息
        table_settings: {
          titles: null,
          operators: {
            width: '200px',
            buttons: [
              {type:'text', icon: 'el-icon-edit', label: '更新', action: 'update'},
              {type:'text', icon: 'el-icon-delete', label: '删除', action: 'delete'}
            ]
          },
          data: null
        },

        // 问项更新
        dialog_title: null,
        show_dialog: false,
        show_question_id: false,
        update_enable: true,
        option_hit: null,
        update_form: {
          id: null,
          name: null,
          type: null,
          title: null,
          option: null
        },
        update_rules: {

        }
      }
    },

    async created() {
      this.questions = await got_question_types().data;
      this.table_settings.titles = await got_question_table_titles().data;
    },

    components: {Table, Pagination},

    methods: {
      search() {

      },

      add() {
        this.show_dialog = true;
        this.dialog_title = '新建问项';
        this.show_question_id = false;
        this.update_enable = false;
      },

      do_click(action, row) {

      },

      do_edit() {

      },

      do_change(type) {
        switch (type) {
          case 1:
            this.option_hit = '请输入问项取值范围, 格式:min-max';
            break;
          case 2:
          case 3:
            this.option_hit = "请输入问项候选项, 候选项用英文','分割";
            break;
          default:
            this.option_hit = "可不用输入";
        }
      }
    }
  }

</script>
