<template>
  <v-app id="app">
    <PrintView />
    <ScrollTop />
    <div :class="{ 'd-none': printView }">
      <Header />
      <router-view />
      <Footer />
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Header: () => import("@/components/Header"),
    Footer: () => import("@/components/Footer"),
    PrintView: () => import("@/components/print/PrintView"),
    ScrollTop: () => import("@/components/ScrollTop"),
  },
  methods: {
    ...mapActions(["updatePrintView"]),
    setTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    close() {
      this.updatePrintView();
    }
  },
  created() {
    this.$eventHub.$on("theme", this.setTheme);
  },
  computed: mapGetters(["printView"])
};
</script>

<style>
@media only print {
  .print-hidden {
    display: none;
  }
}
@media only print {
  .print-show {
    display: contents;
  }
}
.default-grey {
  background-color: #121212 !important;
}
</style>
