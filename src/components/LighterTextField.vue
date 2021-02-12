<template>
  <v-card flat :class="`${theme.dark ? '' : theme.color}`">
    <v-card-title
      :class="`${theme.dark ? '' : theme.color}`"
      class="wrap-word headline"
      >{{ title }}</v-card-title
    >
    <v-card-subtitle class="wrap-word">
      {{ subtitle }}
      <i v-if="comment.length > 0">({{ comment }})</i>
    </v-card-subtitle>
    <v-card-text v-for="(item, n) in text" :key="n">
      {{ item }}
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["title", "subtitle", "comment", "text"],
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>

<style>
.wrap-word {
  word-break: keep-all;
}
.default-grey {
  background-color: #121212 !important;
}
</style>
