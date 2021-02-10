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
          <v-row>
            <v-col></v-col>
            <v-col></v-col>
            <v-col></v-col>
            <v-col>
              Os marcadores dessa coluna são preenchidos automaticamente
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
                    <v-col class="text-center" cols="12" md="3">
                      <v-switch
                        @change="switched(deficiecia.Dominios, i)"
                        v-model="printFuzzy[i].severe"
                        :label="deficiecia.Obs"
                      />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-switch
                        @click="switched(deficiecia.Dominios, i)"
                        v-model="printFuzzy[i].needAid"
                        label="Não dispõe de auxílio de terceiros sempre que necessário."
                      />
                    </v-col>
                    <v-col cols="12" md="5">
                      <FuzzySwitch
                        :innerLabel="
                          `Houve pontuação 25 ou 50 em alguma atividade dos domínios ${formatDomain(
                            deficiecia.Dominios
                          )}; OU Houve pontuação 75 em todas atividade dos domínios ${formatDomain(
                            deficiecia.Dominios
                          )}`
                        "
                        :read-only="true"
                        :dominios="deficiecia.Dominios"
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
    load: false,
    printFuzzy: {}
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
    showHide(status) {
      this.hide = status;
    },
    setFuzzySwitch() {
      this.printFuzzy = Fuzzy.reduce((output, row) => {
        return [...output, { Desc: row.Desc, needAid: false, severe: false }];
      }, []);
    },
    switched(dominios, i) {
      this.updatePrint(i);
      if (this.printFuzzy[i].severe || this.printFuzzy[i].needAid) {
        this.fuzzyfy({
          dominios: dominios,
          normalize: this.$custom.normalize
        });
        this.$eventHub.$emit(
          "fuzzyfy",
          dominios.reduce((output, element) => {
            return [...output, this.$custom.normalize(element).toLowerCase()];
          }, [])
        );
      }
    },
    updatePrint(i) {
      this.updatePrintFuzzy(this.printFuzzy[i]);
    },
    formatDomain(domain) {
      return domain
        .reduce(
          (out, el) => [
            ...out,
            this.$custom.normalize(el) === "socializacao"
              ? "Socialização e Vida Comunitária"
              : el
          ],
          []
        )
        .join(" ou ");
    },
    ...mapActions([
      "makePrintFuzzy",
      "updatePrintFuzzy",
      "makeFuzzy",
      "fuzzyfy"
    ])
  },
  created() {
    this.$eventHub.$emit("score");
    this.makePrintFuzzy(Fuzzy);
    this.setFuzzySwitch();
    this.makeFuzzy({
      scores: this.allScores,
      Fuzzy,
      normalize: this.$custom.normalize
    });
  }
};
</script>
