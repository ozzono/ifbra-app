<template>
  <v-card flat tile :class="`${theme.dark ? '' : theme.color}`">
    <v-container :class="`${theme.dark ? '' : theme.color}`">
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
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
/* eslint-disable no-console */
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
