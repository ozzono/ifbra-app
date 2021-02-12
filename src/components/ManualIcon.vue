<template>
  <v-card
    tile
    v-on="on"
    v-bind="bind"
    :class="
      `d-flex justify-center align-center
      ${left ? 'icon-left-card' : ''}
      ${right ? 'icon-right-card' : ''}
      ${theme.dark ? 'grey lighten-1' : 'light-blue lighten-4'}
      `
    "
    flat
    height="3rem"
    width="3rem"
    min-height="3rem"
    min-width="3rem"
  >
    <v-icon x-large :class="`${theme.dark ? 'black--text' : ''}`">
      {{ icon }}
    </v-icon>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ManualIcon",
  props: ["left", "right", "icon", "on", "bind", "url"],
  computed: mapGetters(["theme"]),
  methods: {
    newTab() {
      this.$eventHub.$emit("force-blur");
      window.open(this.url);
    }
  }
};
</script>

<style scoped>
.icon-left-card {
  transform: scale(1.5, 1.5);
  margin-left: 2rem;
  margin-right: 1.1rem;
}
.icon-right-card {
  transform: scale(1.5, 1.5);
  margin-left: 1.1rem;
  margin-right: 2rem;
}
</style>
