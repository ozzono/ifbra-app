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
      <v-btn class="hidden-sm-and-down" @click="dialog = true">
        Imprimir
      </v-btn>
      <v-btn class="hidden-md-and-up" @click="dialog = true" small>
        Imprimir
      </v-btn>
      <v-btn icon>
        <v-icon @click="updatePrint">mdi-close</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" width="50%" class="print-hidden">
        <v-card class="print-hidden">
          <v-card-title class="headline">
            Contribua
          </v-card-title>
          <v-card-text>
            Se esse formulário poupou seu tempo considere contribuir com sua
            manutenção.
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="success" text @click="printSection(true)">
              Imprimir e doar
            </v-btn>
            <v-btn outlined color="primary" text @click="printSection(false)">
              Só imprimir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: mapGetters(["printView", "theme"]),
  data: () => ({ dialog: false }),
  methods: {
    ...mapActions(["updatePrintView"]),
    updatePrint() {
      this.updatePrintView();
    },
    printSection(support) {
      this.dialog = false;
      setTimeout(() => {
        window.print();
        this.updatePrint();
        if (support) {
          window.location.href = "#/apoio";
        }
      }, 200);
    }
  }
};
</script>
<style scoped>
.right-sm-pad {
  padding-right: 0.5rem;
}
</style>
