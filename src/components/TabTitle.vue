<template>
  <v-card tile flat :class="`${this.theme.dark ? '' : this.theme.color}`">
    <v-card-title width="100%">
      {{ title }}
    </v-card-title>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["title"],
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>
