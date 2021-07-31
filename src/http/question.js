import {success} from "../utils/utils";

export function got_question_types() {
  let types = [
    {id: 1, name: '数字'},
    {id: 2, name: '单选'},
    {id: 3, name: '多选'},
    {id: 4, name: '文字'},
    {id: 5, name: '日期'},
    {id: 6, name: '时间'},
    {id: 7, name: '其他'}
  ];
  return success(types);
}

export function got_question_table_titles() {
  let titles = [
    {sortable: true, prop: 'id', label: '问项编号', width: '150px'},
    {sortable: true, prop: 'name', label: '问项名称', width: '150px'},
    {sortable: true, prop: 'type', label: '问项类型', width: '150px'},
    {sortable: false, prop: 'title', label: '问项标题', width: '150px'},
    {sortable: false, prop: 'option', label: '问项候选值', width: '150px'},
    {sortable: true, prop: 'owner', label: '登记人', width: '150px'},
    {sortable: true, prop: 'time', label: '创建时间', width: '150px'},
  ];
  return success(titles);
}

export async function async_got_question_infos(params) {
  let resp = [
    {id: 1, name: 'Q1', title: '患者年龄',  type: '数字'},
    {id: 2, name: 'Q2', title: '患者性别', type: '单选'},
    {id: 3, name: 'Q3', title: '复查时间', type: '时间'},
  ];
  return success(resp);
}
