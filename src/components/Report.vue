<template>
  <v-container class="text-center">
    <v-card class="card text-left d-inline-flex" min-width="50%">
      <v-card-text>
        <div class="text-center">
          <h2>Resumo do Índice</h2>
        </div>
        <v-row cols="8" v-for="(score, i) in this.allScores" :key="i">
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
            {{ this.total.medical.toFixed(2) }}</v-col
          >
          <v-col class="text-center" cols="2">
            {{ this.total.social.toFixed(2) }}</v-col
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["allScores"])
  },
  methods: {
    calcTotal() {
      this.total = {
        medical: 0,
        social: 0
      };
      var count = this.allScores.length;
      this.allScores.forEach(score => {
        this.total.medical = parseInt(score.Average.medical, 10);
        this.total.social = parseInt(score.Average.social, 10);
      });
      this.total.medical = this.total.medical / count;
      this.total.social = this.total.social / count;
    }
  },
  created() {
    this.calcTotal();
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
