<template>
  <div @keydown.esc="close()" class="print-btn">
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        fullscreen
        scrollable
        transition="dialog-bottom-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab small color="primary" dark v-bind="attrs" v-on="on">
            <v-icon>mdi-printer</v-icon>
          </v-btn>
        </template>
        <v-card :class="`${theme.dark ? '' : theme.color}`">
          <v-toolbar tile dense dark color="primary print-hidden">
            <v-toolbar-title>Visualizar impressão</v-toolbar-title>
            <v-spacer />
            <v-btn icon dark @click="close()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text>
            <v-container>
              <h1 class="text-center">Avaliação Médica Funcional</h1>
              <!-- start form 1 -->
              <v-row>
                <v-col>
                  <LighterTextField
                    title="Formulário 1"
                    subtitle="Identificação do Avaliado e da Avaliação"
                    comment="Matriz"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col v-if="allEvaluators.length > 0">
                  Data da Avaliação: {{ evalDate }}
                </v-col>
              </v-row>
              <v-row v-for="evaluator in allEvaluators" :key="evaluator.id">
                <v-col cols="4">Tipo de avaliador: {{ evaluator.type }}</v-col>
                <v-col>Nome do avaliador: {{ evaluator.name }}</v-col>
              </v-row>
              <v-divider v-if="allEvaluators.length > 0" />
              <v-row>
                <v-col>Dados do Avaliado</v-col>
              </v-row>
              <v-row>
                <v-col cols="6">Nome: {{ personal.name || "" }} </v-col>
                <v-col>Nascimento: {{ setBirthday() }}</v-col>
                <v-col>Idade: {{ personal.age || "" }} anos</v-col>
              </v-row>
              <v-row>
                <v-col>Matrícula: {{ personal.registry || "" }}</v-col>
                <v-col>Sexo: {{ personal.sex || "" }}</v-col>
                <v-col>Etnia: {{ personal.ethnicity || "" }}</v-col>
              </v-row>
              <v-divider />
              <v-row>
                <v-col>
                  Tipo{{
                    personal.deficiencyType.length > 1 ? "s" : "" || ""
                  }}
                  de Deficiência: {{ personal.deficiencyType.join(", ") || "" }}
                </v-col>
                <v-col>
                  Diagnóstico Médico:
                  {{ personal.CID.join(", ").replace(": ", " - ") || "" }}
                </v-col>
              </v-row>
              <v-row>
                <v-col>Histórico Clínico: {{ personal.history || "" }}</v-col>
              </v-row>
              <!-- end form 1 -->
              <MiniReport />
              <!-- start form 2 -->
              <v-row>
                <v-col>
                  <LighterTextField
                    title="Formulário 2"
                    subtitle="Funções corporais acometidas"
                    comment="a ser preenchido pelo médico perito"
                  />
                </v-col>
              </v-row>
              <div v-for="(bodyFunction, i) in bodyFunctions" :key="i">
                <v-row
                  v-for="(subFunction, j) in bodyFunction.SubFunction"
                  :key="j"
                >
                  <v-col
                    cols="2"
                    class="d-flex align-center justify-center text-center"
                  >
                    <v-switch readonly v-model="subFunction.checked" />
                  </v-col>
                  <v-col>
                    <LighterTextField
                      :title="`${i + 1}.${j + 1} ${subFunction.Type}:`"
                      :subtitle="`${subFunction.Detail}`"
                      comment=""
                    />
                  </v-col>
                </v-row>
              </div>
              <!-- end form 2 -->
              <!-- start form 3 -->
              <v-row>
                <v-col>
                  <LighterTextField
                    title="Formulário 3"
                    subtitle="Aplicação do Instrumento"
                    comment="Matriz"
                  />
                </v-col>
              </v-row>
              <div v-for="(dominio, i) in allScores" :key="i">
                <v-row>
                  <v-col>
                    <LighterTextField
                      :title="`${i + 1}. ${dominio.Desc}`"
                      subtitle=""
                      comment=""
                    />
                  </v-col>
                </v-row>
                <v-row v-for="(subdominio, j) in dominio.SubDominios" :key="j">
                  <v-col cols="6">
                    <LighterTextField
                      :title="`${i + 1}.${j + 1} ${subdominio.Desc}`"
                      :subtitle="subdominio.Detalhe"
                      comment=""
                    />
                  </v-col>
                  <v-col
                    cols="2"
                    class="text-center d-flex justify-center align-center"
                  >
                    Médica: {{ subdominio.medical }}
                  </v-col>
                  <v-col
                    cols="2"
                    class="text-center d-flex justify-center align-center"
                  >
                    Social: {{ subdominio.social }}
                  </v-col>
                  <v-col
                    cols="2"
                    class="text-center d-flex justify-center align-center"
                  >
                    <div>
                      {{
                        subdominio.barriers.length > 0
                          ? `Barreira${
                              subdominio.barriers.length > 1 ? "s" : ""
                            }: ${subdominio.barriers.join(", ")}`
                          : "Nenhuma barreira assinalada."
                      }}
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-container>
            <Report />
            <!-- end form 3 -->
            <!-- start form 4 -->
            <v-container>
              <v-row>
                <v-col>
                  <LighterTextField
                    title="Formulário 4"
                    subtitle="Aplicação do Modelo Linguístico Fuzzy"
                    comment=""
                  />
                </v-col>
              </v-row>
            </v-container>
            <!-- end form 4  -->
            <ScrollTop />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  }),
  methods: {
    log() {
      console.log(this.personal);
    },
    setBirthday() {
      return (this.personal.birthday || "").length > 0
        ? this.personal.birthday
            .split("-")
            .reverse()
            .join("/")
        : "";
    },
    close() {
      this.dialog = false;
      let el = this.$el.querySelector(":focus");
      if (el) el.blur();
    }
  },
  computed: mapGetters([
    "personal",
    "allEvaluators",
    "evalDate",
    "bodyFunctions",
    "allScores",
    "theme"
  ]),
  components: {
    ScrollTop: () => import("@/components/ScrollTop"),
    LighterTextField: () => import("@/components/LighterTextField"),
    MiniReport: () => import("@/components/MiniReport"),
    Report: () => import("@/components/Report")
  }
};
</script>
