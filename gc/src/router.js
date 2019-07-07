import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const work_duty =() =>import ('./views/work_duty/work_duty.vue')
const work_duty_section  =()=> import('./views/work_duty/view/section.vue')
const work_duty_department  =()=> import('./views/work_duty/view/department.vue')
const work_duty_jobs  =()=> import('./views/work_duty/view/jobs.vue')
const work_status  =()=> import('./views/work_status.vue')
const policy_country  =()=> import('./views/policy/view/country.vue')
const policy_province  =()=> import('./views/policy/view/province.vue')
const policy_school  =()=> import('./views/policy/view/school.vue')
const policy_inner  =()=> import('./views/policy/view/inner.vue')
const policy  =()=> import('./views/policy/policy.vue')
const item_manager  =()=> import('./views/item_manager.vue')
const school_plan  =()=> import('./views/school_plan/school_plan.vue')
const school_plan_guangzhou  =()=> import('./views/school_plan/view/guangzhou.vue')
const school_plan_three_water  =()=> import('./views/school_plan/view/three_water.vue')

const school_scenery  =()=> import('./views/school_scenery/index.vue')
const school_scenery_guangzhou  =()=> import('./views/school_scenery/view/guangzhou.vue')
const school_scenery_three_water  =()=> import('./views/school_scenery/view/three_water.vue')

const project_build  =()=> import('./views/project_build/project_build.vue')
const project_build_plan_build  =()=> import('./views/project_build/view/plan_build.vue')
const project_build_building_project  =()=> import('./views/project_build/view/building_project.vue')
const project_build_built_project =()=> import('./views/project_build/view/built_project.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // redirect:{
      //   name:'home'
      // },
      component: Home
    },
    {
      path: '/work_duty',
      name: 'work_duty',
      redirect: "/work_duty/section",
      component: work_duty,
      children: [
        {
          path: '/work_duty/section',
          name: "work_duty_section",
          component: work_duty_section,
        },
        {
          path: '/work_duty/department',
          name: "work_duty_department",
          component: work_duty_department,
        },
        {
          path: '/work_duty/jobs',
          name: "work_duty_jobs",
          component: work_duty_jobs,
        },
      ]
    },
    {
      path: '/work_status',
      name: 'work_status',
      component: work_status,
    },
    {
      path: 'policy',
      name: 'policy',
      redirect: "/policy/country",
      children: [
        {
          path: '/policy/country',
          name: "policy_country",
          component: policy_country,
        },
        {
          path: '/policy/province',
          name: "policy_province",
          component: policy_province,
        },
        {
          path: '/policy/school',
          name: "policy_school",
          component: policy_school,
        },
        {
          path: '/policy/inner',
          name: "policy_inner",
          component: policy_inner,
        },
      ],
      component: policy,
    },
    {
      path: '/item_manager',
      name: 'item_manager',
      component: item_manager,
    },
    {
      path: '/school_plan',
      name: 'school_plan',
      // redirect: "/school_plan/guangzhou",
      component: school_plan,
      children: [
        {
          path: '/school_plan/guangzhou',
          name: "school_plan_guangzhou",
          component: school_plan_guangzhou,
        },
        {
          path: '/school_plan/three_water',
          name: "school_plan_three_water",
          component: school_plan_three_water,
        }
      ]
    },
    {
      path: '/school_scenery',
      name: 'school_scenery',
      redirect: {
        name:'school_scenery_guangzhou'
      },
      component: school_scenery,
      children: [
        {
          path: 'guangzhou',
          name: "school_scenery_guangzhou",
          component: school_scenery_guangzhou,
        },
        {
          path: 'three_water',
          name: "school_scenery_three_water",
          component: school_scenery_three_water,
        }
      ]
    },
    {
      path: '/project_build',
      name: 'project_build',
      redirect: "project_build/building_project",
      component: project_build,
      children: [
        {
          path: 'plan_build',
          name: "project_build_plan_build",
          component: project_build_plan_build,
        },
        {
          path: 'building_project',
          name: "project_build_building_project",
          component: project_build_building_project,
        },
        ,
        {
          path: 'built_project',
          name: "project_build_built_project",
          component: project_build_built_project,
        }
      ]
    },
  ]
})

