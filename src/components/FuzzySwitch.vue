<template>
  <v-container fluid :class="innerClass">
    <v-switch
      :class="innerClass"
      :readonly="readOnly"
      :disabled="disabled"
      :input-value="val"
      :label="innerLabel"
    />
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
export default {
  data: () => ({
    val: false
  }),
  name: "FuzzySwitch",
  props: [
    "innerLabel",
    "readOnly",
    "disabled",
    "dominios",
    "hint",
    "innerClass",
    "hideDetails"
  ],
  methods: {
    setVal() {
      this.val = this.fuzzy
        .filter(fuzzyEl =>
          this.dominios.some(
            domainEl =>
              this.$custom.normalize(domainEl) ===
              this.$custom.normalize(fuzzyEl.Dominio)
          )
        )
        .some(el => el.switch);
    }
  },
  computed: {
    ...mapGetters(["fuzzy"])
  },
  created() {
    this.$eventHub.$on("score", this.setVal);
  }
};
</script>
<style scoped>
.unavailable:hover {
  cursor: not-allowed;
}
</style>
