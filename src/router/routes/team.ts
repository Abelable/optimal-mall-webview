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
];

export default team;
