<template>
  <div>
    <!-- 面包屑: 显示页面路径 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>课题管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区 -->
    <el-form :inline="true" ref="search" :model="search_form" label-width="80px" style="margin-top: 20px">
      <el-form-item label="课题名称">
        <el-input v-model="search_form.name" placeholder="请输入课题名称" prefix-icon="el-icon-search" />
      </el-form-item>
      <el-form-item label="课题类型">
        <el-select v-model="search_form.type" clearable placeholder="请选择课题类型">
          <el-option v-for="s in subject_types" :key="s.id" :label="s.name" :value="s.name"/>
        </el-select>
      </el-form-item>
      <el-form-item label="研究单位">
        <el-input v-model="search_form.unit" placeholder="请输入研究单位" prefix-icon="el-icon-search" />
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
        <el-form-item v-if="show_subject_id" label="课题编号" prop="id">
          <el-input v-model="update_form.id" disabled style="width: 100%;" />
        </el-form-item>
        <el-form-item label="课题名称" prop="name">
          <el-input v-model="update_form.name" :disabled="update_enable" placeholder="请输入课题名称" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="研究单位" prop="unit">
          <el-input v-model="update_form.unit" :disabled="update_enable" placeholder="请输入课题名称" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="课题类型" prop="type">
          <el-select v-model="update_form.type" clearable placeholder="请选择课题类型" style="width: 100%">
            <el-option v-for="s in subject_types" :key="s.id" :label="s.name" :value="s.id  "/>
          </el-select>
        </el-form-item>
        <el-form-item label="课题负责人" prop="name">
          <el-input v-model="update_form.owner" placeholder="请输入课题负责人, 多个负责人用英文','分割" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="课题备注" prop="desc">
          <el-input v-model="update_form.desc" type="textarea" placeholder="请使用5到100个字符描述课题信息" style="width: 100%;" />
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
  import {
    async_add_subject,
    async_got_subject_infos,
    got_subject_table_titles,
    got_subject_types
  } from "../../http/subject";

  export default {
    data() {
      return {
        subject_types: null,

        // 课题搜索
        search_form: {
          name: '',
          type: '',
          unit: '',
          owner: ''
        },

        // 课题显示
        table_settings: {
          titles: null,
          operators: {
            width: '150px',
            buttons: [
              {type:'text', icon: 'el-icon-edit', label: '更新', action: 'update'},
              {type:'text', icon: 'el-icon-delete', label: '删除', action: 'delete'}
            ]
          },
          data: []
        },

        // 课题编辑
        dialog_title: null,
        show_dialog: false,
        show_subject_id: false,
        update_enable: true,
        update_form: {
          id: 0,
          name: null,
          type: null,
          unit: null,
          owner: null,
          state: null,
          desc: null
        },
        update_rules: {

        }
      }
    },

    async created() {
      this.subject_types = await got_subject_types().data;
      this.table_settings.titles = await got_subject_table_titles().data;
      async_got_subject_infos(null).then(resp => {
        if (resp.code === 0) {
          this.table_settings.data = resp.data;
          return;
        }
        this.$notify.error({title: '错误', message: '课题列表信息请求异常, 联系管理员'});
      });
    },

    components: {
      Table, Pagination
    },

    methods: {
      search() {

      },

      add() {
        this.show_dialog = true;
        this.update_enable = false;
        this.show_subject_id = false;
        this.dialog_title = '新建课题';
      },

      update(row) {
        this.show_dialog = true;
        this.update_enable = true;
        this.show_subject_id = true;
        this.dialog_title = '更新课题';
        this.update_form.id = row.id;
        this.update_form.name = row.name;
        this.update_form.unit = row.unit;
        this.update_form.type = row.type_id;
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
        async_add_subject(this.update_form)
          .then(resp => {
            console.info(JSON.stringify(resp));
          })
          .catch(error => {
            console.info(JSON.stringify(error));
          });
      }
    }
  }
</script>
