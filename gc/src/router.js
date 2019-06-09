import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import work_duty from './views/work_duty/work_duty.vue'
import work_duty_section from './views/work_duty/view/section.vue'
import work_duty_department from './views/work_duty/view/department.vue'
import work_duty_jobs from './views/work_duty/view/jobs.vue'
import work_status from './views/work_status.vue'
import policy_country from './views/policy/view/country.vue'
import policy_province from './views/policy/view/province.vue'
import policy_school from './views/policy/view/school.vue'
import policy_inner from './views/policy/view/inner.vue'
import policy from './views/policy/policy.vue'
import item_manager from './views/item_manager.vue'
import school_plan from './views/school_plan/school_plan.vue'
import school_plan_guangzhou from './views/school_plan/view/guangzhou.vue'
import school_plan_three_water from './views/school_plan/view/three_water.vue'
import project_build from './views/project_build/project_build.vue'
import project_build_plan_build from './views/project_build/view/plan_build.vue'
import project_build_building_project from './views/project_build/view/building_project.vue'



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
      path: '/project_build',
      name: 'project_build',
      redirect: "project_build/building_project",
      component: project_build,
      children: [
        {
          path: '/project_build/plan_build',
          name: "project_build_plan_build",
          component: project_build_plan_build,
        },
        {
          path: '/project_build/building_project',
          name: "project_build_building_project",
          component: project_build_building_project,
        }
      ]
    },
  ]
})

