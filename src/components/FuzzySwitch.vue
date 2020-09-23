<template>
  <v-container fluid>
    <v-switch :readonly="readOnly" :input-value="val" :label="innerLabel" />
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
  props: ["innerLabel", "readOnly", "dominios", "normalize"],
  methods: {
    setVal() {
      this.val = this.fuzzy
        .filter(fuzzyEl =>
          this.dominios.some(
            domainEl =>
              this.normalize(domainEl) === this.normalize(fuzzyEl.Dominio)
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
