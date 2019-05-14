import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/work_duty',
      name: 'work_duty',
      redirect: "/work_duty/section",
      component: () => import(/* webpackChunkName: "about" */ './views/work_duty/work_duty.vue'),
      children: [
        {
          path: '/work_duty/section',
          name: "work_duty_section",
          component: () => import(/* webpackChunkName: "about" */ './views/work_duty/view/section.vue'),
        },
        {
          path: '/work_duty/department',
          name: "work_duty_department",
          component: () => import(/* webpackChunkName: "about" */ './views/work_duty/view/department.vue'),
        },
        {
          path: '/work_duty/jobs',
          name: "work_duty_jobs",
          component: () => import(/* webpackChunkName: "about" */ './views/work_duty/view/jobs.vue'),
        },
      ]
    },
    {
      path: '/work_status',
      name: 'work_status',
      component: () => import(/* webpackChunkName: "about" */ './views/work_status.vue')
    },
    {
      path: 'policy',
      name: 'policy',
      redirect: "/policy/country",
      children: [
        {
          path: '/policy/country',
          name: "policy_country",
          component: () => import(/* webpackChunkName: "about" */ './views/policy/view/country.vue'),
        },
        {
          path: '/policy/province',
          name: "policy_province",
          component: () => import(/* webpackChunkName: "about" */ './views/policy/view/province.vue'),
        },
        {
          path: '/policy/school',
          name: "policy_school",
          component: () => import(/* webpackChunkName: "about" */ './views/policy/view/school.vue'),
        },
        {
          path: '/policy/inner',
          name: "policy_inner",
          component: () => import(/* webpackChunkName: "about" */ './views/policy/view/inner.vue'),
        },
      ],
      component: () => import(/* webpackChunkName: "about" */ './views/policy/policy.vue'),
    },
    {
      path: '/item_manager',
      name: 'item_manager',
      component: () => import(/* webpackChunkName: "about" */ './views/item_manager.vue')
    },
    {
      path: '/school_plan',
      name: 'school_plan',
      // redirect: "/school_plan/guangzhou",
      component: () => import(/* webpackChunkName: "about" */ './views/school_plan/school_plan.vue'),
      children: [
        {
          path: '/school_plan/guangzhou',
          name: "school_plan_guangzhou",
          component: () => import(/* webpackChunkName: "about" */ './views/school_plan/view/guangzhou.vue'),
        },
        {
          path: '/school_plan/three_water',
          name: "school_plan_three_water",
          component: () => import(/* webpackChunkName: "about" */ './views/school_plan/view/three_water.vue'),
        }
      ]
    },
    {
      path: '/project_build',
      name: 'project_build',
      redirect: "project_build/building_project",
      component: () => import(/* webpackChunkName: "about" */ './views/project_build/project_build.vue'),
      children: [
        {
          path: '/project_build/plan_build',
          name: "project_build_plan_build",
          component: () => import(/* webpackChunkName: "about" */ './views/project_build/view/plan_build.vue'),
        },
        {
          path: '/project_build/building_project',
          name: "project_build_building_project",
          component: () => import(/* webpackChunkName: "about" */ './views/project_build/view/building_project.vue'),
        }
      ]
    },
  ]
})

