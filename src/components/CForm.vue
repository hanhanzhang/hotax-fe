<template>
  <div>
    <form-create v-model="fApi" :rule="config" :option="options"/>
  </div>
</template>

<script>

  // 官网: http://www.form-create.com/v2/guide/
  import form_create from "@form-create/element-ui";
  import {got_question_configuration} from "../http/application";

  export default {
    name: 'Form',

    data() {
      return {
        // 表单实例对象
        fApi: {},
        config: [],
        options: {
          submitBtn: {show: false}
        }
      }
    },

    async created() {
      let subject = this.records.subject_form[0];
      let form =  this.records.subject_form[1];
      this.config = await got_question_configuration(subject, form).data;
    },

    props: ['records'],

    components: {
      formCreate: form_create.$form()
    },

    methods: {
      validate_form() {
        let res = false;
        this.fApi.validate((valid, failure) => {
          if (valid) {
            res = true;
            // 表单数据
            this.records.answers = this.fApi.form;
          } else {
            this.$notify.error({title: '错误', message: '问项数据录入异常, 请检查录入数据是否符合要求'});
          }
        });
        return res;
      }
    }
  }

</script>
