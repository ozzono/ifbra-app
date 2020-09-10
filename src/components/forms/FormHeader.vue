<template>
  <v-card
    flat
    :class="
      `d-flex align-center justify-space-between
      ${theme.dark ? 'default-grey' : theme.color}`
    "
  >
    <BaseTextField :title="title" :subtitle="subtitle" :comment="comment" />
    <v-card
      tile
      flat
      :class="`justify-start ${theme.dark ? 'default-grey' : theme.color}`"
    >
      <TextSwitch
        @toggle="$emit('toggle', $event)"
        :value="['exibir', 'ocultar']"
        active-color="primary"
      />
    </v-card>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FormHeader",
  props: ["title", "subtitle", "comment"],
  components: {
    TextSwitch: () => import("@/components/TextSwitch"),
    BaseTextField: () => import("@/components/BaseTextField")
  },
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>
