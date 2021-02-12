<template>
  <v-card flat tile :class="`${theme.dark ? 'default-grey' : theme.color}`">
    <v-card flat :class="`${theme.dark ? 'default-grey' : theme.color}`">
      <v-card-title
        :class="
          `wrap-word headline ${theme.dark ? 'default-grey' : theme.color}`
        "
        >{{ title }}</v-card-title
      >
      <v-card-subtitle class="wrap-word">
        {{ subtitle }}
        <i v-if="comment.length > 0">({{ comment }})</i>
      </v-card-subtitle>
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["title", "subtitle", "comment"],
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>

<style scoped>
.wrap-word {
  word-break: keep-all;
}
</style>
