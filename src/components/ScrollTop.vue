<template>
  <v-container class="print-hidden scroll-y">
    <v-layout align-center justify-center>
      <v-flex>
        <v-btn
          v-scroll="onScroll"
          v-show="fab"
          fab
          dark
          small
          fixed
          bottom
          right
          opacity="0"
          color="primary"
          @click="toTop"
        >
          <v-icon>mdi-arrow-up-bold</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    fab: false
  }),

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
      this.$eventHub.$emit("force-blur");
    }
  }
};
</script>
