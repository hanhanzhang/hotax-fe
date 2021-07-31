export function got_system_menus() {
  return [
    {
      id: 1,
      icon: 'icon-data-manage',
      name: '数据管理',
      children: [
        {
          id: 11,
          icon: 'icon-data-subject-manage',
          name: '课题管理',
          url: '/data/subject/mange'
        },
        {
          id: 12,
          icon: 'icon-data-form-manage',
          name: '表单管理',
          url: '/data/form/mange'
        },
        {
          id: 13,
          icon: 'icon-data-question-manage',
          name: '问项管理',
          url: '/data/question/mange'
        }
      ]
    },
    {
      id: 2,
      icon: 'icon-data-application',
      name: '数据应用',
      children: [
        {
          id: 21,
          icon: 'icon-data-application-register',
          name: '数据录入',
          url: '/app/data/add'
        },
        {
          id: 22,
          icon: 'icon-data-application-import',
          name: '数据导入',
          url: '/app/data/import'
        },
        {
          id: 23,
          icon: 'icon-data-application-show',
          name: '数据查阅',
          url: '/app/data/info'
        },
        {
          id: 24,
          icon: 'icon-data-application-export',
          name: '数据导出',
          url: '/app/data/export'
        }
      ]
    },
    {
      id: 3,
      icon: 'icon-system-manage',
      name: '系统管理',
      children: [
        {
          id: 31,
          icon: 'icon-system-user-mange',
          name: '客户管理',
          url: '/system/user/mange'
        },
        {
          id: 32,
          icon: 'icon-system-permission-manage',
          name: '权限管理',
          children: [
            {
              id: 321,
              icon: 'icon-system-permission-resource-mange',
              name: '资源管理',
              url: '/system/permission/res'
            },
            {
              id: 322,
              icon: 'icon-system-permission-role-manage',
              name: '角色管理',
              url: '/system/permission/role'
            },
            {
              id: 323,
              icon: 'icon-system-permission-grant-manage',
              name: '授权管理',
              url: '/system/permission/grant'
            }
          ]
        }
      ]
    }
  ];
}

export function success(data) {
  return {
    code: 0,
    msg: 'success',
    data: data
  }
}

export function failure(msg) {
  return {
    code: 1,
    msg: msg
  }
}
