import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/admin',
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          meta: {
            title:'项目负责人 - 项目信息'
          },
          component: resolve => {
            require(['../components/admin/tasking.vue'], resolve)
          }
        },
        {
          path: 'add/:id',
          name: 'addTask',
          meta: {
            title:'项目负责人 - 创建任务'
          },
          component: resolve => {
            require(['../components/admin/addTask.vue'], resolve)
          }
        },
        {
          path: 'edit/:id',
          name: 'editTask',
          meta: {
            title:'项目负责人 - 修改任务'
          },
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
          meta: {
            title:'项目负责人 - 项目详情'
          },
          component: resolve => {
            require(['../components/admin/taskInfo.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/opadmin',
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          meta: {
            title:'运营管理 - 任务列表'
          },
          component: resolve => {
            require(['../components/operateAdmin/tasking.vue'], resolve)
          }
        },
        {
          path: 'search',
          component: resolve => {
            require(['../components/operateAdmin/search.vue'], resolve)
          }
        },
        {
          path: 'add/:id',
          meta: {
            title:'运营管理 - 任务分配'
          },
          component: resolve => {
            require(['../components/operateAdmin/add.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/customer',
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          meta: {
            title:'销售 - 客户关系'
          },
          component: resolve => {
            require(['../components/customer/infoList.vue'], resolve)
          }
        },
        {
          path: 'info/:id',
          meta: {
            title:'销售 - 客户详情'
          },
          name:'CustomerInfo',
          component: resolve => {
            require(['../components/customer/customerInfo.vue'], resolve)
          }
        },
        {
          path: 'add',
          meta: {
            title:'销售 - 添加客户'
          },
          name:'CustomerAdd',
          component: resolve => {
            require(['../components/customer/customerAdd.vue'], resolve)
          }
        },
        {
          path: 'edit/:id',
          meta: {
            title:'销售 - 修改客户'
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
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          meta: {
            title:'销售 - 项目信息'
          },
          component: resolve => {
            require(['../components/project/infoList.vue'], resolve)
          }
        },
        {
          path: 'add',
          name:'ProjectAdd',
          meta: {
            title:'销售 - 添加项目'
          },
          component: resolve => {
            require(['../components/project/add.vue'], resolve)
          }
        },
        {
          path: 'schedule/:id',
          name:'ProjectSchedule',
          meta: {
            title:'销售 - 项目阶段'
          },
          component: resolve => {
            require(['../components/project/schedule.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/plan',
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          name:'PlanList',
          meta: {
            title:'销售 - 工作计划'
          },
          component: resolve => {
            require(['../components/plan/list.vue'], resolve)
          }
        },
        {
          path: 'add',
          name:'PlanAdd',
          meta: {
            title:'销售 - 新增计划'
          },
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
        },
        {
          path: 'edit/:id',
          name:'PlanEdit',
          component: resolve => {
            require(['../components/plan/edit.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/clock',
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          name:'PunchClock',
          meta: {
            title:'销售 - 外出打卡'
          },
          component: resolve => {
            require(['../components/clock/clock.vue'], resolve)
          }
        },
        {
          path: 'add',
          name:'ClockAdd',
          component: resolve => {
            require(['../components/clock/add.vue'], resolve)
          }
        },
        {
          path: 'punch',
          name:'Punch',
          meta: {
            title:'销售 - 现场打卡'
          },
          component: resolve => {
            require(['../components/clock/Punch.vue'], resolve)
          }
        },
        {
          path: 'record',
          name:'ClockRecord',
          meta: {
            title:'销售 - 打卡记录'
          },
          component: resolve => {
            require(['../components/clock/clock_record.vue'], resolve)
          }
        },
        {
          path: 'calendar',
          name:'ClockCalendar',
          meta: {
            title:'销售 - 打卡月历'
          },
          component: resolve => {
            require(['../components/clock/calendar.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/workLog',
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          name:'WorkLog',
          meta: {
            title:'销售 - 工作日志'
          },
          component: resolve => {
            require(['../components/workLog/log.vue'], resolve)
          }
        },
        {
          path: 'add',
          name:'LogAdd',
          meta: {
            title:'销售 - 新增日志'
          },
          component: resolve => {
            require(['../components/workLog/logAdd.vue'], resolve)
          }
        },
        {
          path: 'edit',
          name:'LogEdit',
          component: resolve => {
            require(['../components/workLog/edit.vue'], resolve)
          }
        },
        {
          path: 'calendar',
          name:'LogCalendar',
          component: resolve => {
            require(['../components/workLog/calendar.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/build',
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          name:'Build',
          meta: {
            title:'施工日志'
          },
          component: resolve => {
            require(['../components/build/buildLog.vue'], resolve)
          }
        },
        {
          path: 'clock',
          name:'buildClock',
          meta: {
            title:'运营 - 现场打卡'
          },
          component: resolve => {
            require(['../components/build/clock.vue'], resolve)
          }
        },
        {
          path: 'info/:id',
          name:'buildInfo',
          meta: {
            title:'运营 - 现场打卡'
          },
          component: resolve => {
            require(['../components/build/buildInfo.vue'], resolve)
          }
        },
        {
          path: 'schedule/:id',
          name:'buildSchedule',
          meta: {
            title:'运营 - 项目详情'
          },
          component: resolve => {
            require(['../components/build/schedule.vue'], resolve)
          }
        },
        {
          //项目列表
          path: 'proList',
          name:'buildPro',
          meta: {
            title:'运营 - 项目管理'
          },
          component: resolve => {
            require(['../components/build/proList.vue'], resolve)
          }
        },
        {
          path: 'plan',
          name:'buildPlan',
          component: resolve => {
            require(['../components/build/plan.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/operate',
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '/',
          name:'OperatePlan',
          meta: {
            title:'运营 - 工作计划'
          },
          component: resolve => {
            require(['../components/operate/planList.vue'], resolve)
          }
        },
        {
          path: 'planPro/:id',
          name:'OperatePlanPro',
          meta: {
            title:'运营 - 工作计划'
          },
          component: resolve => {
            require(['../components/operate/planPro.vue'], resolve)
          }
        },
        {
          path: 'planDate',
          name:'OperatePlanDate',
          meta: {
            title:'施工计划'
          },
          component: resolve => {
            require(['../components/operate/planDate.vue'], resolve)
          }
        },
        {
          path: 'planDateInfo',
          name:'OperateplanDateInfo',
          meta: {
            title:'施工计划'
          },
          component: resolve => {
            require(['../components/operate/planDateInfo.vue'], resolve)
          }
        },
        {
          path: 'planBuild/:id',
          name:'OperatePlanBuild',
          meta: {
            title:'运营 - 新增计划'
          },
          component: resolve => {
            require(['../components/operate/planBiuld.vue'], resolve)
          }
        },
        {
          path: 'log',
          name:'OperateLog',
          meta: {
            title:'运营 - 施工日志'
          },
          component: resolve => {
            require(['../components/operate/log.vue'], resolve)
          }
        },
        {
          path: 'log-list',
          name:'OperateLogList',
          meta: {
            title:'运营 - 施工日志'
          },
          component: resolve => {
            require(['../components/operate/log-list.vue'], resolve)
          }
        },
        {
          path: 'addlog',
          name:'OperateaddLog',
          meta: {
            title:'运营 - 新增日志'
          },
          component: resolve => {
            require(['../components/operate/addlog.vue'], resolve)
          }
        },
        {
          path: 'addlogSave',
          name:'OperateaddLogSave',
          meta: {
            title:'施工日志'
          },
          component: resolve => {
            require(['../components/operate/addlogSave.vue'], resolve)
          }
        },
        {
          path: 'logList',
          name:'OperatelogList',
          meta: {
            title:'施工日志管理_日查看'
          },
          component: resolve => {
            require(['../components/operate/logList.vue'], resolve)
          }
        },
        {
          path: 'logDate',
          name:'OperatelogDate',
          meta: {
            title:'运营 - 施工日志月历'
          },
          component: resolve => {
            require(['../components/operate/logDate.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/login',
      meta: {
        title:'实名认证'
      },
      component: resolve => {
        require(['../components/login/login.vue'], resolve)
      },
    },
    {
      path: '/login-ok',
      meta: {
        title:'实名认证'
      },
      component: resolve => {
        require(['../components/login/login-ok.vue'], resolve)
      },
    },
    {
      path: '/backlog',
      component: resolve => {
        require(['../components/route.vue'], resolve)
      },
      children:[
        {
          path: '',
          name:'backlog-list',
          meta: {
            title:'待办项'
          },
          component: resolve => {
            require(['../components/Backlog/backlog.vue'], resolve)
          }
        },
        {
          path: '/blog_info/:id',
          name:'backlog-info',
          meta: {
            title:'待办项'
          },
          component: resolve => {
            require(['../components/Backlog/blog_info.vue'], resolve)
          }
        },
        {
          path: '/under_way',
          name:'under_way',
          meta: {
            title:'待办项'
          },
          component: resolve => {
            require(['../components/Backlog/under_way.vue'], resolve)
          }
        },
        {
          path: '/add_under_way/:id',
          name:'add_under_way',
          meta: {
            title:'待办项'
          },
          component: resolve => {
            require(['../components/Backlog/add_under_way.vue'], resolve)
          }
        },
        {
          path: '/up_wait/:id',
          name:'up_wait',
          meta: {
            title:'待办项'
          },
          component: resolve => {
            require(['../components/Backlog/up_wait.vue'], resolve)
          }
        },
        {
          path: '/sleArea',
          name:'sleArea',
          meta: {
            title:'待办项'
          },
          component: resolve => {
            require(['../components/Backlog/area.vue'], resolve)
          }
        },
      ]
    },
    {
      path: '/test',
      component: resolve => {
        require(['../components/test.vue'], resolve)
      },
    }
  ]
})
