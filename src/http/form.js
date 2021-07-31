import {success} from "../utils/utils";

export function got_form_table_titles() {
  let resp = [
    {sortable: true, prop: 'id', label: '表单编号', width: '150px'},
    {sortable: true, prop: 'name', label: '表单名称', width: '150px'},
    {sortable: true, prop: 'subject', label: '课题名称', width: '150px'},
    {sortable: true, prop: 'owner', label: '登记人', width: '150px'},
    {sortable: true, prop: 'time', label: '登记时间', width: '150px'},
    {sortable: false, prop: 'desc', label: '表单描述', width: 'auto'},
  ];
  return success(resp);
}

export async function async_got_form_infos() {
  let resp = [
    {id: 4088, name: '患者基本信息', subject:'种植体复查', owner: '隋慧萍', desc: '记录种植体患者信息', time: '2021-07-28'},
    {id: 4090, name: '初次就诊牙周状况', subject:'种植体复查', owner: '隋慧萍', desc: '记录初次就诊牙周状况', time: '2021-07-28'},
    {id: 4092 , name: '种植手术', subject:'种植体复查', owner: '隋慧萍', desc: '记录种植手术信息', time: '2021-07-28'},
    {id: 4093, name: '种植复查记录', subject:'种植体复查', owner: '隋慧萍', desc: '记录种植复查记录', time: '2021-07-28'}
  ];
  return success(resp);
}

export async function async_got_subject_names(params) {
  let resp = [
    {id: 1, name: '种植体复查'},
    {id: 2, name: '牙周炎复查'},
  ];
  return success(resp)
}
