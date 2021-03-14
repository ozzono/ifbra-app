<template>
  <v-card
    tile
    flat
    outlined
    :class="`text-h6 font-wight-medium ${theme.dark ? '' : theme.color}`"
  >
    <div class="d-flex justify-center align-center">
      <LighterTextField text="" title="Classificação" subtitle="" comment="" />
    </div>
    <v-container>
      <v-row>
        <v-col :class="`text-center ${theme.dark ? '' : theme.color}`">
          Pontuação: {{ totalScore.medical + totalScore.social }}
        </v-col>
        <v-col :class="`text-center ${theme.dark ? '' : theme.color}`">
          Grau:
          {{
            degree.includes("insuficiente")
              ? "Pontuação insuficiente para concessão do Benefício"
              : `Deficiência ${upperFirst(degree)}`
          }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    LighterTextField: () => import("@/components/LighterTextField")
  },
  computed: mapGetters(["totalScore", "degree", "theme"]),
  methods: {
    upperFirst(val) {
      if (typeof val !== "string") return undefined;
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  }
};
</script>

<style></style>
