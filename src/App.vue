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
/* eslint-disable no-console */
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({ media: null }),
  components: {
    Header: () => import("@/components/Header"),
    Footer: () => import("@/components/Footer"),
    PrintView: () => import("@/components/print/PrintView"),
    ScrollTop: () => import("@/components/ScrollTop")
  },
  methods: {
    ...mapActions(["updatePrintView", "setTheme"]),
    setVueTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    close() {
      this.updatePrintView();
    },
    forceBlur() {
      let el = this.$el.querySelector(":focus");
      if (el) el.blur();
    },
    setWidth() {
      this.$eventHub.$emit("resize");
    }
  },
  created() {
    this.$eventHub.$on("theme", this.setVueTheme);
    this.$eventHub.$on("force-blur", this.forceBlur);
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      console.log("Enabling dark mode automatically.");
      this.setTheme(true);
      this.setVueTheme();
    }
  },
  mounted() {
    window.addEventListener("resize", this.setWidth);
  },
  computed: mapGetters(["printView", "theme"])
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
