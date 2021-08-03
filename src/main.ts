import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vue Font-Awesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fas);

// Global styles
import "./assets/scss/flex-styles.scss";

// Vue Table lite
import VueTableLite from "vue3-table-lite";

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("vue-table-lite", VueTableLite)
  .mount("#app");
