import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vant/lib/index.css";
import "./utils/resize";

createApp(App).use(router).use(store).mount("#app");
