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
  }
};
</script>
