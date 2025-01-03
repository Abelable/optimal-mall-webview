import { RouteRecordRaw } from "vue-router";
import agreements from "./agreements";
import team from "./team";
import activity from "./activity";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    name: "auth",
    meta: {
      title: "实名认证",
    },
    component: () => import("@/pages/auth/index.vue"),
  },
  ...agreements,
  ...team,
  ...activity,
];

export default routes;
