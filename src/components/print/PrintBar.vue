<template>
  <v-card class="print-hidden hidden-print-only" flat tile>
    <v-toolbar flat dense class="primary">
      <v-toolbar-title>Visualizar Impressão</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="printSection">Imprimir</v-btn>
      <v-btn icon>
        <v-icon @click="updatePrint">mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["printView"]),
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
