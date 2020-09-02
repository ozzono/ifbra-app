<template>
  <v-card flat tile :class="`${colored ? 'grey lighten-5' : ''}`">
    <v-container>
      <v-card flat :class="`${colored ? 'grey lighten-5' : ''}`">
        <v-card-title class="wrap headline">{{ title }}</v-card-title>
        <v-card-subtitle class="wrap">
          {{ subtitle }}
          <i v-if="comment.length > 0">({{ comment }})</i>
        </v-card-subtitle>
      </v-card>
    </v-container>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
export default {
  props: ["title", "subtitle", "comment", "colored"],
};
</script>

<style scoped>
.wrap {
  word-break: keep-all;
}
</style>
