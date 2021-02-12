<template>
  <div>
    <v-row>
      <v-col>
        <LighterTextField
          text=""
          title="Formulário 4"
          subtitle="Aplicação do Modelo Linguístico Fuzzy"
          comment=""
        />
      </v-col>
    </v-row>
    <EmptyFormAlert text="" :show="Object.keys(printFuzzy).length == 0" />
    <v-row v-for="(row, i) in printFuzzy" :key="i">
      <v-col cols="2" class="d-flex align-">
        <!--  description -->
        {{ row.Desc }}
      </v-col>
      <v-col cols="3">
        <!-- severity -->
        <v-card
          flat
          :class="
            `${theme.dark ? '' : theme.color} d-flex justiy-start align-start`
          "
        >
          <v-card
            flat
            tile
            :class="`${theme.dark ? '' : theme.color} right-pad`"
          >
            <v-icon x-large> {{ checkBox(row.severe) }} </v-icon>
          </v-card>
          <v-card
            flat
            :class="`${theme.dark ? '' : theme.color} d-flex justify-start`"
          >
            {{ row.Obs }}
          </v-card>
        </v-card>
      </v-col>
      <v-col cols="3">
        <!-- need aid -->
        <v-card
          flat
          :class="`${theme.dark ? '' : theme.color} d-flex flex-row align-`"
        >
          <v-card
            flat
            tile
            :class="`${theme.dark ? '' : theme.color} right-pad`"
          >
            <v-icon x-large> {{ checkBox(row.needAid) }} </v-icon>
          </v-card>
          <v-card flat tile :class="`${theme.dark ? '' : theme.color}`">
            Não dispõe de auxílio de terceiros sempre que necessário.
          </v-card>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          flat
          :class="`${theme.dark ? '' : theme.color} d-flex flex-row align-`"
        >
          <v-card
            flat
            tile
            :class="`${theme.dark ? '' : theme.color} right-pad`"
          >
            <v-icon x-large> {{ checkBox(fuzzySwitch[i]) }} </v-icon>
          </v-card>
          <v-card flat tile :class="`${theme.dark ? '' : theme.color}`">{{
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
import { mapGetters } from "vuex";
export default {
  data: () => ({
    fuzzySwitch: [false, false, false, false]
  }),
  computed: mapGetters(["fuzzy", "printFuzzy", "theme"]),
  components: {
    LighterTextField: () => import("@/components/LighterTextField"),
    EmptyFormAlert: () => import("@/components/print/EmptyFormAlert")
  },
  methods: {
    setDomains() {
      this.fuzzySwitch = this.printFuzzy.reduce(
        (out1, el1) => [
          ...out1,
          el1.Dominios.some(domain =>
            this.fuzzy.some(
              fuzzy =>
                fuzzy.Dominio === this.$custom.normalize(domain) && fuzzy.switch
            )
          )
        ],
        []
      );
    },
    checkBox: check =>
      check ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline"
  },
  created() {
    this.$eventHub.$on("score", this.setDomains);
    this.setDomains();
    this.normalize = this.$custom.normalize;
  }
};
</script>

<style scoped>
.right-pad {
  padding-right: 1rem;
}
</style>
