<template>
  <v-card flat tile :class="{ 'default-grey': theme.dark }">
    <v-container :class="{ 'default-grey': theme.dark }">
      <v-card flat :class="{ 'default-grey': theme.dark }">
        <v-card-title
          :class="{ 'default-grey': theme.dark }"
          class="wrap-word headline"
          >{{ title }}</v-card-title
        >
        <v-card-subtitle class="wrap-word">
          {{ subtitle }}
          <i v-if="comment.length > 0">({{ comment }})</i>
        </v-card-subtitle>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
/* eslint-disable no-console */
export default {
  props: ["title", "subtitle", "comment", "colored"],
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
