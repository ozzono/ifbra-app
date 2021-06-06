<template>
  <v-select
    class="score-item"
    :dense="makeDense"
    :label="innerLabel"
    v-model="selected"
    :items="innerItems"
    :outlined="makeOutlined"
    :hint="innerHint"
    :persistent-hint="innerHint.length > 0"
    ref="select"
    :rules="isRequired(selected)"
  />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CheckList",
  data: () => ({
    selected: []
  }),
  props: [
    "innerItems",
    "innerLabel",
    "makeClearable",
    "makeOutlined",
    "makeDense",
    "innerHint",
    "scoreData",
    "allowClean" //required by default
  ],
  computed: {
    allItems() {
      return this.selected.length === this.innerItems.length;
    },
    someItems() {
      return this.selected.length > 0 && !this.allItems;
    },
    icon() {
      if (this.allItems) return "mdi-close-box";
      if (this.someItems) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
    ...mapGetters(["allScores", "personal", "totalScores", "filledStatus"])
  },

  methods: {
    refreshScores() {
      const update = {
        col: this.scoreData.column,
        i: this.scoreData.i,
        j: this.scoreData.j,
        value: this.selected,
        dominio: this.scoreData.dominio
      };
      this.updateScores(update);
      this.cycleScores(update);

      if (this.filledStatus) {
        this.calcScores();
        this.$eventHub.$emit("filled");
      }
      this.updateFuzzy({
        dominio: this.scoreData.dominio,
        scores: this.allScores
      });
      this.$eventHub.$emit("score");
    },
    applyFuzzy(dominios) {
      dominios = dominios.map(dominio =>
        this.$custom.normalize(dominio).toLowerCase()
      );
      if (
        dominios.some(element => {
          return element === this.scoreData.dominio;
        })
      ) {
        const value = this.allScores.reduce((output, element) => {
          if (element.Dominio === this.scoreData.dominio) {
            output = element.min[this.scoreData.column];
          }
          return output;
        }, 100);
        if (value != null) {
          this.selected = `${value}`;
        }
      }
    },
    toggle() {
      this.$nextTick(() => {
        if (this.allItems) {
          this.selected = [];
        } else {
          this.selected = this.innerItems.slice();
        }
      });
    },
    clear() {
      this.selected = [];
    },
    innerFocus() {
      this.$refs.select.focus();
    },
    isRequired(val) {
      if (!this.allowClean) {
        return [(val || "").length > 0 || "Campo Obrigatório"];
      }
    },
    changed() {
      this.$emit("changed", "changed");
    },
    ...mapActions(["updateScores", "cycleScores", "updateFuzzy", "calcScores"])
  },
  watch: {
    selected() {
      this.changed(this.selected);
      this.refreshScores();
    }
  },
  created() {
    this.$eventHub.$on("fuzzyfy", this.applyFuzzy);
  }
};
</script>
