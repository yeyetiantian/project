import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      name: 'Admin',
      meta: {
        title:'客户关系'
      },
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          component: resolve => {
            require(['../components/admin/tasking.vue'], resolve)
          }
        },
        {
          path: 'task',
          name: 'Task',
          component: resolve => {
            require(['../components/admin/tasking.vue'], resolve)
          }
        },
        {
          path: 'add',
          name: 'addTask',
          component: resolve => {
            require(['../components/admin/addTask.vue'], resolve)
          }
        },
        {
          path: 'edit/:id',
          name: 'editTask',
          component: resolve => {
            require(['../components/admin/editTask.vue'], resolve)
          }
        },
        {
          path: 'cs/:id',
          name: 'csTask',
          component: resolve => {
            require(['../components/admin/csTask.vue'], resolve)
          }
        },
        {
          path: 'info/:id',
          name: 'TaskInfo',
          component: resolve => {
            require(['../components/admin/taskInfo.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/customer',
      name: 'Customer',
      meta: {
        title:'客户关系'
      },
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          component: resolve => {
            require(['../components/customer/infoList.vue'], resolve)
          }
        },
        {
          path: 'info/:id',
          meta: {
            title:'客户关系-详情'
          },
          name:'CustomerInfo',
          component: resolve => {
            require(['../components/customer/customerInfo.vue'], resolve)
          }
        },
        {
          path: 'add',
          meta: {
            title:'客户关系-添加'
          },
          name:'CustomerAdd',
          component: resolve => {
            require(['../components/customer/customerAdd.vue'], resolve)
          }
        },
        {
          path: 'edit/:id',
          meta: {
            title:'客户关系-修改'
          },
          name:'CustomerEdit',
          component: resolve => {
            require(['../components/customer/customerEdit.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/project',
      name: 'Project',
      meta: {
        title:'项目信息'
      },
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          component: resolve => {
            require(['../components/project/infoList.vue'], resolve)
          }
        },
        {
          path: 'add',
          name:'ProjectAdd',
          component: resolve => {
            require(['../components/project/add.vue'], resolve)
          }
        },
        {
          path: 'schedule',
          name:'ProjectSchedule',
          component: resolve => {
            require(['../components/project/schedule.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/plan',
      name: 'Plan',
      meta: {
        title:'工作计划'
      },
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          name:'PlanList',
          component: resolve => {
            require(['../components/plan/list.vue'], resolve)
          }
        },
        {
          path: 'add',
          name:'PlanAdd',
          component: resolve => {
            require(['../components/plan/add.vue'], resolve)
          }
        },
        {
          path: 'info/:id',
          name:'PlanInfo',
          component: resolve => {
            require(['../components/plan/info.vue'], resolve)
          }
        }
      ]
    },
  ]
})
