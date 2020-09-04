<template>
  <v-card flat>
    <v-container :class="{ 'default-grey': theme.dark }">
      <v-row>
        <v-col cols="8">
          <BaseTextField
            :title="title"
            :subtitle="subtitle"
            :comment="comment"
          />
        </v-col>
        <v-col cols="2">
          <ChipSwitch class="chip" @toggle="$emit('toggle', $event)" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FormHeader",
  props: ["title", "subtitle", "comment"],
  components: {
    ChipSwitch: () => import("@/components/ChipSwitch"),
    BaseTextField: () => import("@/components/BaseTextField")
  },
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>

<style scoped>
.chip {
  padding-top: 1.5rem;
}
</style>
