<template>
  <div>
    <v-flex>
      <v-container class="grey lighten-5">
        <v-row align="center" dense class="flex">
          <FormHeader
            title="Formulário 3"
            subtitle="Aplicação do Instrumento"
            comment="Matriz"
          />
        </v-row>
        <div class="form3">
          <v-row align="center" dense class="flex">
            <v-col :cols="ContentCols">
              Domínios e Atividades
            </v-col>
            <v-col cols="7">
              <v-row>
                <v-col class="text-center" :cols="SelectCols * 2">
                  <span>Pontuação</span>
                  <Tooltip
                    content="Consulte a legenda para mais critérios de preenchimento da pontuação."
                    mdiIcon="mdi-comment-question-outline"
                  />
                </v-col>
                <v-col class="text-center" :cols="CheckListCols">
                  <span>Barreiras Ambientais</span>
                  <Tooltip
                    content="Consulte a legenda para mais informações a respeito das Barreiras Ambientais."
                    mdiIcon="mdi-comment-question-outline"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div text-wrap v-for="(dominio, i) in Dominios" :key="i">
            {{ i + 1 }}. {{ dominio.Desc }}
            <v-row
              align="center"
              dense
              class="flex"
              v-for="(subdominio, j) in dominio.SubDominios"
              :key="j"
            >
              <v-col class="align-start" :cols="ContentCols">
                <v-textarea
                  :value="domainFields(i, j, subdominio).Detail"
                  :label="domainFields(i, j, subdominio).Desc"
                  rows="1"
                  readonly
                  disabled
                  auto-grow
                  class="align-start"
                ></v-textarea>
              </v-col>
              <v-col class="align-start" :cols="7">
                <v-row>
                  <v-col
                    class="align-start justify-md-end"
                    :cols="6"
                    :md="SelectCols"
                  >
                    <CheckList
                      :inner-items="INSS"
                      inner-label="Médica"
                      :make-outlined="true"
                      @selected-items="
                        refreshScores('medical', i, j, $event, dominio.Dominio)
                      "
                    />
                  </v-col>
                  <v-col
                    class="align-start justify-md-end"
                    :cols="6"
                    :md="SelectCols"
                  >
                    <CheckList
                      :inner-items="INSS"
                      inner-label="Social"
                      :make-outlined="true"
                      @selected-items="
                        refreshScores('social', i, j, $event, dominio.Dominio)
                      "
                    />
                  </v-col>
                  <v-col class="align-start" :cols="12" :md="CheckListCols">
                    <CheckList
                      inner-label="Barreira Ambiental"
                      :inner-items="Barreiras"
                      :allow-multiple="true"
                      :make-outlined="true"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <hr />
          </div>
        </div>
      </v-container>
    </v-flex>
  </div>
</template>
<script>
/* eslint-disable no-console */
import Dominios from "@/assets/json/form3.json";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    ContentCols: 5,
    SelectCols: 3,
    CheckListCols: 6,
    Dominios: Object.values(Dominios),
    Barreiras: ["P e T", "Amb", "A e R", "At", "SS e P"],
    INSS: ["25", "50", "75", "100"]
  }),
  components: {
    FormHeader: () => import("@/components/forms/FormHeader"),
    CheckList: () => import("@/components/CheckList"),
    Tooltip: () => import("@/components/Tooltip")
  },
  methods: {
    ...mapActions([
      "setScores",
      "updateScores",
      "cycleScores",
      "calcScores",
      "makeFuzzy",
      "updateFuzzy"
    ]),
    domainFields(i, j, subdominio) {
      if (subdominio.Detalhe.length == 0) {
        console.log({ i: i + 1, j: j + 1, subdominio: subdominio });
      }
      return subdominio.Detalhe.length == 0
        ? { Detail: `${i + 1}.${j + 1} ${subdominio.Desc}`, Desc: "" }
        : {
            Detail: subdominio.Detalhe,
            Desc: `${i + 1}.${j + 1} ${subdominio.Desc}`
          };
    },
    refreshScores(col, i, j, value, dominio) {
      const update = { col: col, i: i, j: j, value: value, dominio: dominio };
      this.updateScores(update);
      this.cycleScores(update);
      if (this.filledStatus) {
        this.calcScores();
      }
      this.updateFuzzy({ dominio: dominio, scores: this.allScores });
      this.$eventHub.$emit("score");
    }
  },
  computed: {
    ...mapGetters(["filledStatus", "allScores", "fuzzy"])
  },
  created() {
    this.setScores(Dominios);
    this.makeFuzzy(this.allScores);
  }
};
</script>

<style>
:disabled {
  color: black !important;
}
v-textarea {
  border-style: none;
}
</style>
