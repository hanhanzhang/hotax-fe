// 数据导入
import {success} from "../utils/utils";

export function got_data_register_records() {
  return {
    subject_form: [],
    answers: {}
  }
}

export function got_subject_and_form_names(params) {
  let resp = [
    {id: 1, name: '种植体复查',
      children: [{id: 11, name: '患者基本信息'}, {id: 12, name: '初次就诊牙周状况'}]},
    {id: 2, name: '甲状腺复查',
      children: [{id: 21, name: '患者基本信息'}, {id: 22, name: '初次就诊甲状腺状况'}]}
  ];
  return success(resp);
}

export function got_question_configuration(subject, form) {
  let config = [
    {type: 'input', title: '患者姓名', field: '患者姓名', value: '',
      props: {type: 'text', placeholder: '请输入患者名称', style: 'width:100%'},
      validate: [{required: true, message: '请输入患者名称', trigger: 'blur'}]},
    {type: 'InputNumber', title: '患者年龄', field: '患者年龄', value: null,
      props: {max: 120, min: 1, style: "width:100%"}},
    {type: 'radio', title: '是否出诊', field: '是否出诊', value: '0',
      options: [{value: '否', label: '否'}, {value: '是', label: '是'}]},
    {type: 'checkbox', title: '生活习惯', field: '生活习惯', value: [], options: [{value: '吸烟', label: "吸烟"}, {value: '喝酒', label: "喝酒"}],
      props: {multiple: true, clearable: true, placeholder: '请选择生活习惯', style: 'width: 100%'}},
    // date, datetime, datetimerange
    {type: 'DatePicker', title: '初诊日期', field: '初诊日期', value: null,
      props: {type: 'date', format: 'yyyy-MM-dd', placeholder: '请选择初诊日期', style: 'width: 100%'}},
    {type: 'TimePicker', title: '初诊时间', field: '初诊时间', value: null,
      props: {type: 'time', format: 'HH:mm:ss', placeholder: '请选择初诊时间', style: 'width: 100%'}}
  ];
  return success(config);
}
