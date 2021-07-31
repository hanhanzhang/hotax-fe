import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: '',
    //   component: () => import('')
    // },
    {
      path: '/',
      name: '',
      component: () => import('../Home'),
      children: [
        {
          path: '/data/subject/mange',
          name: '课题管理',
          component: () => import('../views/subject/SubjectManage')
        },
        {
          path: '/data/form/mange',
          name: '表单管理',
          component: () => import('../views/subject/FormManage')
        },
        {
          path: '/data/question/mange',
          name: '问项管理',
          component: () => import('../views/subject/QuestionManage')
        },
        {
          path: '/app/data/add',
          name: '数据录入',
          component: () => import('../views/application/DataRegister')
        },
        {
          path: '/app/data/import',
          name: '数据导入',
          component: () => import('../views/application/DataImport')
        },
        {
          path: '/app/data/info',
          name: '数据查阅',
          component: () => import('../views/application/DataInformation')
        },
        {
          path: '/app/data/export',
          name: '数据导出',
          component: () => import('../views/application/DataExport')
        },
        {
          path: '/system/user/mange',
          name: '客户管理',
          component: () => import('../views/system/UserManage')
        },
        {
          path: '/system/permission/res',
          name: '资源管理',
          component: () => import('../views/system/ResourceManage')
        },
        {
          path: '/system/permission/role',
          name: '角色管理',
          component: () => import('../views/system/RoleManage')
        },
        {
          path: '/system/permission/grant',
          name: '授权管理',
          component: () => import('../views/system/PermissionManage')
        }
      ]
    }
  ]
})
