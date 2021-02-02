import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@mdi/font/css/materialdesignicons.css";
import VeeValidate from "vee-validate";

Vue.use(Vuetify);
Vue.use(VeeValidate);

export default new Vuetify({
  icons: {
    iconfont: "mdi" // default - only for display purposes
  }
});
