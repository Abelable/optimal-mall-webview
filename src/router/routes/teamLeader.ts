import { RouteRecordRaw } from "vue-router";

const teamLeader: Array<RouteRecordRaw> = [
  {
    path: "/team_leader/settle_in",
    name: "team_leader_settle_in",
    meta: {
      title: "团长申请",
    },
    component: () => import("@/pages/team-leader/settleIn.vue"),
  },
];

export default teamLeader;
