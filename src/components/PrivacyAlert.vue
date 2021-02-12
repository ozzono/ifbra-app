<template>
  <div class="d-flex justify-center">
    <v-btn
      small
      tile
      :color="`${theme.dark ? 'black' : 'white'}`"
      class="hidden-md-and-up"
      depressed
      @click="dialog = true"
    >
      <v-icon>mdi-alert-circle-outline</v-icon>
    </v-btn>
    <v-btn
      tile
      :color="`${theme.dark ? 'black' : 'white'}`"
      class="hidden-sm-and-down"
      depressed
      @click="dialog = true"
    >
      <v-icon>mdi-alert-circle-outline</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="75%">
      <Disclaimer
        :isDialog="true"
        @close-dialog="dialog = false"
        @keydown.enter="dialog = false"
      />
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false
  }),
  components: {
    Disclaimer: () => import("@/components/Disclaimer")
  },
  created() {
    this.dialog = true;
  },
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>

<style scoped>
</style>
