<template>
  <div :class="`print-btn ${!printView ? 'd-none' : ''}`">
    <v-card :class="`${theme.dark ? '' : theme.color}`">
      <PrintBar />
      <v-container id="printSection">
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
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  }),
  methods: {
    ...mapActions(["updatePrintView"]),
    close() {
      this.updatePrintView();
      this.$eventHub.$emit("force-blur");
    },
    firstLast(name) {
      name = (name || "").length > 0 || "nome";
      let arr = name.split(" ");
      return arr.length > 1 ? [arr[0], arr[arr.length - 1]].join("_") : name;
    }
  },
  computed: mapGetters([
    "personal",
    "allEvaluators",
    "evalDate",
    "bodyFunctions",
    "allScores",
    "theme",
    "fuzzy",
    "printView"
  ]),
  components: {
    PrintBar: () => import("@/components/print/PrintBar"),
    Form1: () => import("@/components/print/Form1"),
    Form2: () => import("@/components/print/Form2"),
    Form3: () => import("@/components/print/Form3"),
    Form4: () => import("@/components/print/Form4"),
    MiniReport: () => import("@/components/MiniReport"),
    Report: () => import("@/components/Report")
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.keyCode == 27 && this.printView) {
        this.close();
      }
    });
  }
};
</script>
