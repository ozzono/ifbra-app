<template>
  <v-container class="text-center" v-if="filledStatus">
    <v-card flat :outlined="makeOutlined" class="text-left">
      <v-card-text>
        <v-card flat class="d-flex justify-center">
          <v-card flat>
            <h2>Resumo do Índice</h2>
            <h5>
              Grau:
              {{
                degree.includes("insuficiente")
                  ? "Pontuação insuficiente para concessão do Benefício"
                  : `Deficiência ${upperFirst(degree)}`
              }}
            </h5>
          </v-card>
          <v-spacer />
          <v-card flat v-if="isDialog">
            <v-btn @click="$emit('close')" text>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card>
        </v-card>
        <v-row>
          <v-col>
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
          <v-col class="text-start">{{ score.Desc }}</v-col>
          <v-col cols="2" class="d-flex justify-center align-center">
            {{ score.total.medical }}
          </v-col>
          <v-col cols="2" class="d-flex justify-center align-center">
            {{ score.total.social }}
          </v-col>
        </v-row>
        <v-divider />
        <v-row class="text-center">
          <v-col cols="8">
            <h4>TOTAL: {{ totalScore.medical + totalScore.social }}</h4>
          </v-col>
          <v-col cols="2" class="d-flex justify-center align-center">
            {{ totalScore.medical }}
          </v-col>
          <v-col cols="2" class="d-flex justify-center align-center">
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
  props: ["isDialog", "makeOutlined"],
  computed: {
    ...mapGetters([
      "allScores",
      "totalScores",
      "totalScore",
      "filledStatus",
      "degree"
    ])
  },
  methods: {
    upperFirst(val) {
      if (typeof val !== "string") return undefined;
      return val.charAt(0).toUpperCase() + val.slice(1);
    }
  }
};
</script>
