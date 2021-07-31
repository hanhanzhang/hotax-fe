<template>
  <div>
    <!-- 面包屑: 显示页面路径 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>表单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区 -->
    <el-form :inline="true" ref="search" :model="search_form" label-width="90px" style="margin-top: 20px">
      <el-form-item label="课题名称">
        <el-select v-model="search_form.subject_name" clearable placeholder="请选择课题名称">
          <el-option v-for="s in subject_infos" :key="s.id" :label="s.name" :value="s.name"/>
        </el-select>
      </el-form-item>
      <el-form-item label="表单名称">
        <el-input v-model="search_form.name" placeholder="请输入表单名称" prefix-icon="el-icon-search" />
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
        <el-form-item v-if="show_form_id" label="表单编号" prop="id">
          <el-input v-model="update_form.id" disabled style="width: 100%;" />
        </el-form-item>
        <el-form-item label="表单名称" prop="name">
          <el-input v-model="update_form.name" :disabled="update_enable" placeholder="请输入表单名称" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="所属课题" prop="subject">
          <el-select v-model="update_form.subject" clearable placeholder="请选择所属课题" style="width: 100%">
            <el-option v-for="s in subject_infos" :key="s.id" :label="s.name" :value="s.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="表单问项" prop="subject">
          <el-select v-model="update_form.questions" clearable multiple placeholder="请选择表单的问项" style="width: 100%">
            <el-option v-for="s in question_infos" :key="s.id" :label="s.name" :value="s.id">
              <span style="float: left">{{ s.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ s.title }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="show_form_id" label="负责人" prop="name">
          <el-input v-model="update_form.owner" :disabled="update_enable" placeholder="请输入表单登记人" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="表单备注" prop="desc">
          <el-input v-model="update_form.desc" type="textarea" placeholder="请使用5到100个字符描述表单信息" style="width: 100%;" />
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
  import {async_got_form_infos, async_got_subject_names, got_form_table_titles} from "../../http/form";
  import {async_got_question_infos} from "../../http/question";

  export default {
    data() {
      return {
        subject_infos: null,
        question_infos: null,
        // 表单搜索
        search_form: {
          subject_name: null,
          name: null
        },

        // 表单信息
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

        // 表单更新
        show_dialog: false,
        dialog_title: null,
        show_form_id: true,
        update_enable: true,
        update_rules: {

        },
        update_form: {
          id: null,
          name: null,
          subject: null,
          questions: null,
          owner: null,
          desc: null
        }
      }
    },

    async created() {
      this.subject_infos = await async_got_subject_names(null).data;
      this.table_settings.titles = await got_form_table_titles().data;
      async_got_form_infos(null).then(resp => {
        if (resp.code === 0) {
          this.table_settings.data = resp.data;
          return;
        }
        this.$notify.error({title: '错误', message: '表单列表信息请求异常, 联系管理员'});
      });
    },

    components: {Table, Pagination},

    methods: {
      search() {

      },

      add() {
        this.show_dialog = true;
        this.show_form_id = false;
        this.update_enable = false;
        this.dialog_title = '新建表单';
        // 问项信息
        if (this.question_infos == null) {
          async_got_question_infos(null).then(resp => {
            if (resp.code === 0) {
              this.question_infos = resp.data;
              return;
            }
            this.$notify.error({title: '错误', message: '问项信息请求异常, 联系管理员'});
          });
        }
      },

      update(row) {
        this.show_dialog = true;
        this.show_form_id = true;
        this.update_enable = true;
        this.dialog_title = '新建表单';
        this.update_form.id = row.id;
        this.update_form.name = row.name;
        this.update_form.owner = row.owner;
        this.update_form.desc = row.desc;
      },

      delete(row) {

      },

      do_click(action, row) {
        if (action === 'update') {
          this.update(row);
        } else if (action === 'delete') {
          this.delete(row);
        }
      },

      do_edit() {

      }
    }
  }

</script>
