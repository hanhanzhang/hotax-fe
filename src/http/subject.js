import {success} from "../utils/utils";
import http from "./utils";
import api from "./api";

// 获取课题类型
export function got_subject_types() {
  let resp = [
    {id: 1, name: '临床试验'},
    {id: 2, name: '动物试验'},
    {id: 3, name: '病例对照研究'},
  ];
  return success(resp);
}

// 获取课题信息表格表头
export function got_subject_table_titles() {
  let resp = [
    {sortable: true, prop: 'id', label: '课题编号', width: '150px'},
    {sortable: true, prop: 'name', label: '课题名称', width: '150px'},
    {sortable: true, prop: 'type', label: '课题类型', width: '150px'},
    {sortable: true, prop: 'unit', label: '研究单位', width: '150px'},
    {sortable: true, prop: 'state', label: '课题状态', width: '150px'},
    {sortable: false, prop: 'owner', label: '负责人', width: '150px'},
    {sortable: true, prop: 'time', label: '登记时间', width: '150px'},
    {sortable: false, prop: 'desc', label: '课题描述', width: '200px'}
  ];
  return success(resp);
}

// 获取课题信息
export async function async_got_subject_infos(params) {
  let resp = [
    {id: 2027, name: '种植体复查', type_id: 3, type: '病例对照研究', unit: '北大口腔', state: '研究中',
      owner: '隋慧萍', desc: '种植体复查课题研究', time: '2021-07-30'}
  ];
  return success(resp);
}

//
export async function async_add_subject(params) {
  return http.post(api.subject_module.add_subject, params)
}
