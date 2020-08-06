<template>
  <v-container>
    <v-card>
      <v-row v-for="(score, i) in this.scores" :key="i">{{ score }}</v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["allScores"])
  },
  created() {
    this.scores = this.allScores.scores;
  }
};
</script>
