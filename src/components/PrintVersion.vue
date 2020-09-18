<template>
  <div @keydown.esc="close()" class="print-btn">
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab small color="primary" dark v-bind="attrs" v-on="on">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </template>
        <v-card :class="`${theme.dark ? '' : theme.color}`">
          <v-toolbar tile dense dark color="primary print-hidden">
            <v-toolbar-title>Visualizar impressão</v-toolbar-title>
            <v-spacer />
            <v-btn icon dark @click="close()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-container>
              <h1 class="text-center">Avaliação Médica Funcional</h1>
              <Form1 />
              <v-divider />
              <MiniReport />
              <v-divider />
              <Form2 />
              <v-divider />
              <Form3 />
            </v-container>
            <Report />
            <v-container>
              <v-divider />
              <Form4 />
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  }),
  methods: {
    log() {
      console.log(this.personal);
    },
    close() {
      this.dialog = false;
      let el = this.$el.querySelector(":focus");
      if (el) el.blur();
    }
  },
  computed: mapGetters([
    "personal",
    "allEvaluators",
    "evalDate",
    "bodyFunctions",
    "allScores",
    "theme",
    "fuzzy"
  ]),
  components: {
    Form1: () => import("@/components/print/Form1"),
    Form2: () => import("@/components/print/Form2"),
    Form3: () => import("@/components/print/Form3"),
    Form4: () => import("@/components/print/Form4"),
    MiniReport: () => import("@/components/MiniReport"),
    Report: () => import("@/components/Report")
  }
};
</script>
