import { RouteRecordRaw } from "vue-router";

const team: Array<RouteRecordRaw> = [
  {
    path: "/activity/limited_time_recruit",
    name: "activity_limited_time_recruit",
    meta: {
      title: "限时低门槛招募推广员",
    },
    component: () => import("@/pages/activities/limitedTimeRecruit/index.vue"),
  },
  // {
  //   path: "/activity/new_year",
  //   name: "activity_new_year",
  //   meta: {
  //     title: "年货节",
  //   },
  //   component: () => import("@/pages/activities/newYear/index.vue"),
  // },
];

export default team;
