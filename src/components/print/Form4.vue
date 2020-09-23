<template>
  <div>
    <v-row>
      <v-col>
        <LighterTextField
          title="Formulário 4"
          subtitle="Aplicação do Modelo Linguístico Fuzzy"
          comment=""
        />
      </v-col>
    </v-row>
    <v-row v-for="(row, i) in printFuzzy" :key="i">
      <v-col cols="2" class="d-flex align-">
        <!--  description -->
        {{ row.Desc }}
      </v-col>
      <v-col cols="2">
        <!-- severity -->
        <v-card flat class="d-flex justiy-start align-start">
          <v-card flat class="right-pad">
            <v-icon v-if="row.severe">mdi-checkbox-marked</v-icon>
            <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
          </v-card>
          <v-card flat class="d-flex justify-start">
            {{ row.Obs }}
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="2">
        <!-- need aid -->
        <v-card flat class="d-flex flex-row align-">
          <v-card flat class="right-pad">
            <v-icon v-if="row.needAid">mdi-checkbox-marked</v-icon>
            <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
          </v-card>
          <v-card flat>
            Não dispõe de auxílio de terceiros sempre que necessário.
          </v-card>
        </v-card>
      </v-col>
      <v-col>
        <v-card flat class="d-flex flex-row align-">
          <v-card flat class="right-pad">
            <v-icon v-if="fuzzySwitch[i]">
              mdi-checkbox-marked
            </v-icon>
            <v-icon v-else>
              mdi-checkbox-blank-outline
            </v-icon>
          </v-card>
          <v-card flat>{{
            `Houve pontuação 25 ou 50 em alguma atividade dos domínios ${row.Dominios.reduce(
              (out, el) => [
                ...out,
                normalize(el) === "socializacao"
                  ? "Socialização e Vida Comunitária"
                  : el
              ],
              []
            ).join(
              " ou "
            )}; OU Houve pontuação 75 em todas atividade dos domínios ${row.Dominios.reduce(
              (out, el) => [
                ...out,
                normalize(el) === "socializacao"
                  ? "Socialização e Vida Comunitária"
                  : el
              ],
              []
            ).join(" ou ")}`
          }}</v-card>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
export default {
  data: () => ({
    fuzzySwitch: [false, false, false, false]
  }),
  computed: mapGetters(["fuzzy", "printFuzzy"]),
  components: {
    LighterTextField: () => import("@/components/LighterTextField")
    // FuzzySwitch: () => import("@/components/FuzzySwitch")
  },
  methods: {
    normalize(input) {
      return input
        .split(" ")
        .reduce((output, item) => {
          return [
            ...output,
            item
              .normalize("NFD")
              .replace(/[^a-zA-Zs]/g, "")
              .toLowerCase()
          ];
        }, [])
        .join(" ");
    },
    setDomains() {
      console.log([this.fuzzy, this.printFuzzy]);
      this.fuzzySwitch = this.printFuzzy.reduce(
        (out1, el1) => [
          ...out1,
          el1.Dominios.some(domain =>
            this.fuzzy.some(
              fuzzy => fuzzy.Dominio === this.normalize(domain) && fuzzy.switch
            )
          )
        ],
        []
      );
      console.log(this.fuzzySwitch);
    }
  },
  created() {
    this.$eventHub.$on("score", this.setDomains);
    this.setDomains();
  }
};
</script>

<style scoped>
.right-pad {
  padding-right: 1rem;
}
</style>
