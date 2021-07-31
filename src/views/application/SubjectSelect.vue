<template>
  <div>
    <el-form ref="rule_form" :rules="rules" :model="records" status-icon label-width="120px">
      <el-form-item label="课题名称" prop="subject_form">
        <el-cascader v-model="records.subject_form" placeholder="试试搜索课题名" filterable
                     :options="subject_form_infos" :props="props" style="width: 100%"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import {got_subject_and_form_names} from "../../http/application";
  import {validate_form} from "../../utils/lang";

  export default {
    data() {
      return {
        subject_form_infos: null,
        props: {
          value: 'id',
          label: 'name',
          children: 'children',
        },
        rules: {
          subject_form: [
            { required: true, message: '请选择课题名称', trigger: 'change' }
          ]
        }
      }
    },

    async created() {
      this.subject_form_infos = await got_subject_and_form_names(null).data;
    },

    props: ["records"],

    methods: {
      validate_form() {
        return validate_form(this, 'rule_form');
      }
    }
  }
</script>
