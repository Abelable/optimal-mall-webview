import { RouteRecordRaw } from "vue-router";
import agreements from "./agreements";
import teamLeader from "./teamLeader";

const routes: Array<RouteRecordRaw> = [...agreements, ...teamLeader];

export default routes;
