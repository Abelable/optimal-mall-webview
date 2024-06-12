import { RouteRecordRaw } from "vue-router";

const agreements: Array<RouteRecordRaw> = [
  {
    path: "/agreements/user_service",
    name: "user_service",
    meta: {
      title: "用户服务协议",
    },
    component: () => import("@/pages/agreements/userService.vue"),
  },
  {
    path: "/agreements/team_leader_service",
    name: "team_leader_service",
    meta: {
      title: "团长服务协议",
    },
    component: () => import("@/pages/agreements/teamLeaderService.vue"),
  },
];

export default agreements;
