<template>
  <div class="form" :class="`${!theme.dark ? theme.color : ''}`">
    <v-flex>
      <v-container>
        <FormHeader
          title="Formulário 4"
          subtitle="Aplicação do Modelo Linguístico Fuzzy"
          comment=""
          @toggle="showHide($event)"
        />
        <div v-bind:class="{ 'd-none': hide }">
          <v-row class="flex">
            <v-col :cols="12">
              <LighterTextField
                title="Domínios e Atividades"
                subtitle=""
                comment=""
              />
            </v-col>
          </v-row>
          <div v-for="(deficiecia, i) in Fuzzy" :key="i">
            <v-divider v-if="i > 0" class="hidden-md-and-up" :inset="true" />
            <v-row class="align-center text-center justify-center d-flex">
              <v-col class="text-center" md="2" cols="12">
                Deficiência {{ deficiecia.Desc }}
              </v-col>
              <v-col cols="10">
                <v-container>
                  <v-row
                    class="align-center text-center justify-center d-flex"
                    flat
                    tile
                  >
                    <v-col class="text-center" cols="12" md="4">
                      <v-switch
                        @change="updatePrint(i)"
                        v-model="printFuzzy[i].severe"
                        :label="deficiecia.Obs"
                      />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-switch
                        @change="updatePrint(i)"
                        v-model="printFuzzy[i].needAid"
                        label="Não dispõe de auxílio de terceiros sempre que necessário."
                      />
                    </v-col>
                    <v-col cols="12" md="4">
                      <FuzzySwitch
                        class="unavailable"
                        :innerLabel="
                          `Houve pontuação 25 ou 50 em alguma atividade dos domínios ${formatDomain(
                            deficiecia.Dominios
                          )}; OU Houve pontuação 75 em todas atividade dos domínios ${formatDomain(
                            deficiecia.Dominios
                          )}`
                        "
                        :disabled="true"
                        :read-only="true"
                        :hint="fuzzyHint"
                        :dominios="deficiecia.Dominios"
                        :normalize="strNormalize"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Fuzzy from "@/assets/json/form4.json";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    Fuzzy: Object.values(Fuzzy),
    hide: false,
    printFuzzy: {},
    fuzzyHint: "Campo calculado e preenchido automaticamente"
  }),
  components: {
    FuzzySwitch: () => import("@/components/FuzzySwitch"),
    LighterTextField: () => import("@/components/LighterTextField"),
    FormHeader: () => import("@/components/forms/FormHeader")
  },
  computed: {
    ...mapGetters(["fuzzy", "theme", "allScores"])
  },
  methods: {
    strNormalize: str =>
      str
        .split(" ")
        .reduce(
          (output, el) => [
            ...output,
            el
              .normalize("NFD")
              .replace(/[^a-zA-Zs]/g, "")
              .toLowerCase()
          ],
          []
        )
        .join(" "),
    showHide(status) {
      this.hide = status;
    },
    setFuzzySwitch() {
      this.printFuzzy = Fuzzy.reduce((output, row) => {
        return [...output, { Desc: row.Desc, needAid: false, severe: false }];
      }, []);
    },
    updatePrint(i) {
      this.updatePrintFuzzy(this.printFuzzy[i]);
    },
    formatDomain(domain) {
      return domain
        .reduce(
          (out, el) => [
            ...out,
            this.strNormalize(el) === "socializacao"
              ? "Socialização e Vida Comunitária"
              : el
          ],
          []
        )
        .join(" ou ");
    },
    ...mapActions(["makePrintFuzzy", "updatePrintFuzzy", "makeFuzzy"])
  },
  created() {
    this.$eventHub.$emit("score");
    this.makePrintFuzzy(Fuzzy);
    this.setFuzzySwitch();
    this.makeFuzzy({
      scores: this.allScores,
      Fuzzy,
      normalize: this.strNormalize
    });
  }
};
</script>

<style scoped>
.unavailable:hover {
  cursor: not-allowed;
}
</style>
