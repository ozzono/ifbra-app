<template>
  <v-card flat class="d-flex justify-center" v-if="show">
    <LighterTextField
      :title="
        text.length > 0
          ? text
          : 'O Formulário aparecerá aqui assim que carregá-lo no menu principal.'
      "
      subtitle=""
      comment=""
      text=""
    />
  </v-card>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
export default {
  props: ["text", "show"],
  computed: mapGetters(["bodyFunctions"]),
  components: {
    LighterTextField: () => import("@/components/LighterTextField")
  },
  created() {
    console.log("show:", this.show);
  }
};
</script>

<style></style>
