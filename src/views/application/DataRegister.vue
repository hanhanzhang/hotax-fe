<template>
  <div>
    <!-- 面包屑: 显示页面路径 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据导入</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 步骤条 -->
    <el-steps :active="active" finish-status="success" align-center style="margin-top: 20px">
      <el-step v-for="step in steps" :title="step.title" :key="step.title" :icon="step.icon"/>
    </el-steps>

    <!-- 任务配置 -->
    <el-card class="box-card" style="margin-top: 30px;">
      <div slot="header" class="clearfix">
        <span> {{ this.steps[this.active].title }} </span>
        <el-button-group style="float: right; padding: 3px 0">
          <el-button v-if="active !== 0" type="text" class="card-button" @click="prev">上一步</el-button>
          <el-button v-if="active === 0" type="text" class="card-button" @click="next">下一步</el-button>
          <el-button v-if="active === 1" type="text" class="card-button" @click="save">保存</el-button>
          <el-button type="text" class="card-button" @click="rest">重置</el-button>
        </el-button-group>
      </div>

      <div>
        <transition name="component-fade" mode="out-in">
          <!-- is特殊属性, 显示的组建名称 -->
          <component :is="view" :ref="view" :records="records" />
        </transition>
      </div>
    </el-card>
  </div>
</template>

<script>

  import SubjectSelect from "./SubjectSelect";
  import CForm from "../../components/CForm";
  import {got_data_register_records} from "../../http/application";

  export default {
    data() {
      return {
        // 进度条
        active: 0,
        steps: [
          {title: '课题选择', icon: 'el-icon-search'},
          {title: '问项录入', icon: 'el-icon-edit-outline'}
        ],
        names: ['subject', 'forms'],

        records: null,
      }
    },

    created() {
      this.records = got_data_register_records();
    },

    components: {
      "subject": SubjectSelect,
      "forms": CForm
    },

    computed: {
      view() {
        return this.names[this.active];
      }
    },

    methods: {
      prev() {
        this.active -= 1;
        if (this.active <= 0) {
          this.active = 0;
        }
      },

      next() {
        let name = this.names[this.active];
        if (this.$refs[name].validate_form()) {
          this.active += 1;
          if (this.active >= 2) {
            this.active = 0;
          }
        }
      },

      save() {
        let ref = this.names[this.active];
        if (this.$refs[ref].validate_form()) {
          // TODO
          console.log(JSON.stringify(this.records));
        }
      },

      rest() {
        this.active = 0;
        this.records = got_data_register_records();
      }
    }
  }

</script>

<style>
  .card-button {
    float:right;
    padding: 3px 10px;
    margin-left: 10px;
  }

  .el-steps {
    margin-top: 20px;
  }

  .el-form {
    margin-top: 20px;
  }
</style>

