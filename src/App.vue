<template>
  <v-app id="app">
    <Header />
    <router-view />
    <Footer />
  </v-app>
</template>

<script>
export default {
  components: {
    Header: () => import("@/components/Header"),
    Footer: () => import("@/components/Footer")
  },
  methods: {
    setTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
  created() {
    this.$eventHub.$on("theme", this.setTheme);
  }
};
</script>
