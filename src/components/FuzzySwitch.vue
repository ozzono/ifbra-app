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
  props: ["innerLabel", "readOnly", "dominios", "is50"],
  methods: {
    normalize(input) {
      return input
        .split(" ")
        .reduce((output, item) => {
          return [
            ...output,
            item
              .normalize("NFD")
              .replace(/[^a-zA-Zs]/g, "")
              .toLowerCase()
          ];
        }, [])
        .join(" ");
    },
    setVal() {
      var _50 = this.dominios
        .reduce((output, element) => {
          return [...output, this.normalize(element)];
        }, [])
        .reduce((output, element) => {
          return [...output, this.fuzzy[`${element}`]];
        }, [])
        .some(element => {
          return element._50;
        });
      var _75 = this.dominios
        .reduce((output, element) => {
          return [...output, this.normalize(element)];
        }, [])
        .reduce((output, element) => {
          return [...output, this.fuzzy[`${element}`]];
        }, [])
        .some(element => {
          return element._75;
        });
      this.val = _50 || _75;
      console.log(this.fuzzy)
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
