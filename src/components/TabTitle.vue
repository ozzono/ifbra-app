<template>
  <v-card tile flat :class="`${this.theme.dark ? '' : this.theme.color}`">
    <v-card-title width="100%">
      {{ title }}
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
/* eslint-disable no-console */
export default {
  data: () => ({
    isHovering: false,
    customColor: ""
  }),
  props: ["title"],
  computed: {
    ...mapGetters(["theme"])
  },
  created() {
    this.$eventHub.$on("theme", this.setVueTheme);
  }
};
</script>
