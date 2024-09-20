import { RouteRecordRaw } from "vue-router";

const team: Array<RouteRecordRaw> = [
  {
    path: "/team",
    name: "team",
    meta: {
      title: "乡村振兴",
    },
    component: () => import("@/pages/team/index.vue"),
  },
  {
    path: "/team/performance",
    name: "team_performance",
    meta: {
      title: "升级数据",
    },
    component: () => import("@/pages/team/subpages/performance.vue"),
  },
  {
    path: "/team/promoter",
    name: "team_promoter",
    meta: {
      title: "我的推广员",
    },
    component: () => import("@/pages/team/subpages/promoter.vue"),
  },
];

export default team;
