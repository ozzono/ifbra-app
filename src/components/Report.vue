<template>
  <v-container class="text-center" v-if="filledStatus">
    <v-card class="card text-left d-inline-flex" min-width="50%">
      <v-card-text>
        <div class="text-center">
          <span>
            <h2>Resumo do Índice</h2>
          </span>
          <Tooltip
            content="Esse cálculo do índice é temporário e está sujeito a atualização"
            mdiIcon="mdi-comment-question-outline"
          />
        </div>
        <v-row cols="8" v-for="(score, i) in allScores" :key="i">
          <v-col class="desc">{{ score.Desc }}</v-col>
          <v-col class="text-center" cols="2">
            {{ score.Average.medical.toFixed(2) }}
          </v-col>
          <v-col class="text-center" cols="2">
            {{ score.Average.social.toFixed(2) }}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="total desc text-center" cols="8">TOTAL</v-col>
          <v-col class="text-center" cols="2">
            {{ scoreTotal.medical.toFixed(2) }}
          </v-col>
          <v-col class="text-center" cols="2">
            {{ scoreTotal.social.toFixed(2) }}
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
    ...mapGetters(["allScores", "scoreTotal", "filledStatus"])
  },
  components: {
    Tooltip: () => import("@/components/Tooltip")
  }
};
</script>

<style scoped>
.desc {
  padding-left: 2rem;
}
/* .card {
} */
</style>
