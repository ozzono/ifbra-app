<template>
  <v-card class="print-hidden hidden-print-only" flat tile>
    <v-toolbar flat dense class="primary">
      <v-toolbar-title class="hidden-sm-and-down">
        Visualizar Impressão
      </v-toolbar-title>
      <v-toolbar-title class="hidden-md-and-up">
        Impressão
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn class="hidden-sm-and-down" @click="printSection">
        Imprimir
      </v-btn>
      <v-btn class="hidden-md-and-up" @click="printSection" small>
        Imprimir
      </v-btn>
      <v-btn icon>
        <v-icon @click="updatePrint">mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["printView", "theme"]),
  methods: {
    ...mapActions(["updatePrintView"]),
    updatePrint() {
      this.updatePrintView();
    },
    printSection() {
      window.print();
      // this.$htmlToPaper("printSection");
    }
  }
};
</script>
<style scoped>
.right-sm-pad {
  padding-right: 0.5rem;
}
</style>
