<template>
  <div :class="`text-center ${filledStatus ? '' : 'd-none'}`">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn tile color="green lighten-2" dark v-bind="attrs" v-on="on">
          Resumo do Índice
        </v-btn>
      </template>

      <v-card flat>
        <Report @close="dialog = false" />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    control: true
  }),
  components: { Report: () => import("@/components/Report") },
  computed: mapGetters(["filledStatus"]),
  created() {
    this.$eventHub.$on("filled", () => {
      if (this.control) {
        this.dialog = true;
        this.control = false;
      }
    });
  }
};
</script>
