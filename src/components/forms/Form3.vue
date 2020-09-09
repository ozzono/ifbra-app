<template>
  <div :class="`${!theme.dark ? theme.color : ''}`">
    <v-flex>
      <v-container>
        <FormHeader
          title="Formulário 3"
          subtitle="Aplicação do Instrumento"
          comment="Matriz"
          @toggle="showHide($event)"
        />
        <div v-bind:class="{ 'd-none': hide }">
          <v-row align="center" dense class="flex">
            <v-col :cols="ContentCols">
              <BaseTextField comment="" title="Domínios e Atividades" />
            </v-col>
            <v-col cols="6">
              <v-row>
                <v-col class="text-center" :cols="SelectCols * 2">
                  <span>Pontuação</span>
                  <Tooltip
                    :arrayContent="pontuacao"
                    content="Consulte a legenda para mais critérios de preenchimento da pontuação."
                    mdiIcon="mdi-comment-question-outline"
                  />
                </v-col>
                <v-col class="text-center" :cols="CheckListCols">
                  <span>Barreiras Ambientais</span>
                  <Tooltip
                    :arrayContent="barreiras"
                    content="Consulte a legenda para mais informações a respeito das Barreiras Ambientais."
                    mdiIcon="mdi-comment-question-outline"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <div
            text-wrap
            v-for="(dominio, i) in Dominios"
            loading="lazy"
            :key="i"
          >
            <BaseTextField comment="" :title="`${i + 1}. ${dominio.Desc}`" />
            <v-row
              align="center"
              dense
              class="flex"
              v-for="(subdominio, j) in dominio.SubDominios"
              :key="j"
            >
              <v-col class="align-start" :cols="ContentCols">
                <BaseTextField
                  comment=""
                  :title="`${i + 1}.${j + 1} ${subdominio.Desc}`"
                  :subtitle="subdominio.Detalhe"
                />
              </v-col>
              <v-col class="align-start" cols="6">
                <v-row>
                  <v-col
                    class="align-start justify-md-end"
                    cols="6"
                    :md="SelectCols"
                  >
                    <CheckList
                      class="checklist"
                      :makeDense="true"
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
                    cols="6"
                    :md="SelectCols"
                  >
                    <CheckList
                      class="checklist"
                      :makeDense="true"
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
                      class="checklist"
                      :makeDense="true"
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
import pontuacao from "@/assets/json/inss.json";
import barreiras from "@/assets/json/barreiras.json";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    ContentCols: 6,
    SelectCols: 3,
    CheckListCols: 6,
    Dominios: Object.values(Dominios),
    pontuacao: Object.values(pontuacao),
    barreiras: Object.values(barreiras),
    Barreiras: ["P e T", "Amb", "A e R", "At", "SS e P"],
    INSS: ["25", "50", "75", "100"],
    hide: false
  }),
  components: {
    FormHeader: () => import("@/components/forms/FormHeader"),
    CheckList: () => import("@/components/CheckList"),
    Tooltip: () => import("@/components/Tooltip"),
    BaseTextField: () => import("@/components/BaseTextField")
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
    BaseTextFields(i, j, subdominio) {
      return subdominio.Detalhe.length == 0
        ? { Detail: `${i + 1}.${j + 1} ${subdominio.Desc}`, Desc: "" }
        : {
            Detail: subdominio.Detalhe,
            Desc: `${i + 1}.${j + 1} ${subdominio.Desc}`
          };
    },
    showHide(status) {
      this.hide = status;
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
    ...mapGetters(["filledStatus", "allScores", "fuzzy", "theme"])
  },
  created() {
    this.setScores(Dominios);
    this.makeFuzzy(this.allScores);
  }
};
</script>

<style scoped>
.checklist {
  padding-top: 1rem !important;
}
span {
  word-break: break-all;
  /* word-break: break-word; */
  max-width: 1em;
  /* white-space: normal; */
}
</style>
