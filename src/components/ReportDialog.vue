<template>
  <div :class="`text-center ${filledStatus ? '' : 'd-none'}`">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="hidden-sm-and-down"
          tile
          color="green lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Resumo do Índice
        </v-btn>
        <v-btn
          class="hidden-md-and-up"
          tile
          color="green lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
          text
        >
          <v-icon>mdi-view-dashboard</v-icon>
        </v-btn>
      </template>

      <v-card flat>
        <Report @close="dialog = false" :is-dialog="true" />
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
