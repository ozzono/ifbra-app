<template>
  <v-card
    flat
    :class="`d-flex justify-center ${theme.dark ? '' : theme.color}`"
    v-if="show"
  >
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
import { mapGetters } from "vuex";
export default {
  props: ["text", "show"],
  computed: mapGetters(["bodyFunctions", "theme"]),
  components: {
    LighterTextField: () => import("@/components/LighterTextField")
  }
};
</script>
