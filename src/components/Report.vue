<template>
  <v-container class="text-center" v-if="filledStatus">
    <v-card class="text-left">
      <v-card-text>
        <div class="text-center">
          <span>
            <h2>Resumo do Índice</h2>
          </span>
          <Tooltip
            class="print-hidden"
            content="Esse cálculo do índice é temporário e está sujeito a atualização"
            mdiIcon="mdi-comment-question-outline"
            :array-content="[]"
          />
        </div>
        <v-row>
          <v-col class="desc">
            <h3>Domínios</h3>
          </v-col>
          <v-col class="text-center" cols="2">Score Médico</v-col>
          <v-col class="text-center" cols="2">Score Social</v-col>
        </v-row>
        <v-row
          class="text-center"
          v-for="(score, i) in totalScores"
          dense
          :key="i"
        >
          <v-col class="desc text-start">{{ score.Desc }}</v-col>
          <v-col cols="2">
            {{ score.total.medical }}
          </v-col>
          <v-col cols="2">
            {{ score.total.social }}
          </v-col>
        </v-row>
        <v-divider />
        <v-row class="text-center">
          <v-col cols="6">TOTAL</v-col>
          <v-col cols="2">
            {{ totalScore.medical + totalScore.social }}
          </v-col>
          <v-col cols="2" class="text-center">
            {{ totalScore.medical }}
          </v-col>
          <v-col cols="2" class="text-center">
            {{ totalScore.social }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["allScores", "totalScores", "totalScore", "filledStatus"])
  },
  components: {
    Tooltip: () => import("@/components/Tooltip")
    // BaseTextField: () => import("@/components/BaseTextField")
  }
};
</script>

<style scoped>
.desc {
  padding-left: 2rem;
}
</style>
