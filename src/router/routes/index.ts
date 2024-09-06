import { RouteRecordRaw } from "vue-router";
import agreements from "./agreements";

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
];

export default routes;
