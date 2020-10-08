<template>
  <v-card
    flat
    tile
    :class="
      `d-flex align-center justify-space-between
      ${theme.dark ? '' : theme.color}`
    "
  >
    <LighterTextField :title="title" :subtitle="subtitle" :comment="comment" />
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FormHeader",
  props: ["title", "subtitle", "comment"],
  components: {
    LighterTextField: () => import("@/components/LighterTextField")
  },
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>
