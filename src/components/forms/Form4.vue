<template>
  <div class="form" :class="`${!theme.dark ? theme.color : ''}`">
    <div class="text-center">
      <v-dialog v-model="dialog" max-width="77%">
        <v-card>
          <v-card-title class="headline">
            Aplicação automática do modelo Fuzzy
          </v-card-title>

          <v-card-text>
            Ao assinalar severidade ou necessidade de auxílio para uma
            deficiência marcada no formulário de identificação, Formulário 1, as
            pontuações do Formulário 3 para os respectivos domínios sensíveis
            serão modificados automaticamente utilizando o menor valor marcado.
            <v-divider class="topbottom-margin" />
            <v-row>
              <v-col>
                Esse alerta aperecerá apenas uma vez após carregar a página.
              </v-col>
            </v-row>
            <v-divider class="topbottom-margin" />
            <div class="text-center">
              <v-row>
                <v-col>
                  Relação de deficiência e respectivos domínios sensíveis
                </v-col>
              </v-row>
              <v-row v-for="(deficiencia, i) in Fuzzy" :key="i">
                <v-col cols="6" md="4">{{ deficiencia.Desc }}</v-col>
                <v-col cols="6" md="8">
                  {{ deficiencia.Dominios.join(" e ") }}
                </v-col>
              </v-row>
            </div>
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">
              Ciente
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>

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
          <div v-for="(deficiencia, i) in Fuzzy" :key="i">
            <v-divider v-if="i > 0" class="hidden-md-and-up" :inset="true" />
            <v-row class="align-center text-center justify-center d-flex">
              <v-col class="text-center" md="2" cols="12">
                Deficiência {{ deficiencia.Desc }}
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
                        @change="switched(deficiencia, i)"
                        v-model="printFuzzy[i].severe"
                        :label="deficiencia.Obs"
                      />
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-switch
                        @click="switched(deficiencia, i)"
                        v-model="printFuzzy[i].needAid"
                        label="Não dispõe de auxílio de terceiros sempre que necessário."
                      />
                    </v-col>
                    <v-col cols="12" md="5">
                      <FuzzySwitch
                        :innerLabel="
                          `Houve pontuação 25 ou 50 em alguma atividade dos domínios ${formatDomain(
                            deficiencia.Dominios
                          )}; OU Houve pontuação 75 em todas atividade dos domínios ${formatDomain(
                            deficiencia.Dominios
                          )}`
                        "
                        :read-only="true"
                        :dominios="deficiencia.Dominios"
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
    dialog: false,
    openDialog: true,
    printFuzzy: {}
  }),
  components: {
    FuzzySwitch: () => import("@/components/FuzzySwitch"),
    LighterTextField: () => import("@/components/LighterTextField"),
    FormHeader: () => import("@/components/forms/FormHeader")
  },
  computed: {
    ...mapGetters(["fuzzy", "theme", "allScores", "personal"])
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
    switched(deficiency, i) {
      this.updatePrint(i);
      if (
        (this.printFuzzy[i].severe || this.printFuzzy[i].needAid) &&
        this.personal.deficiencyType.some(el1 => {
          return deficiency.Type === this.$custom.normalize(el1).toLowerCase();
        })
      ) {
        if (this.openDialog) {
          this.dialog = true;
        }
        this.fuzzyfy({
          dominios: deficiency.Dominios,
          normalize: this.$custom.normalize
        });
        this.$eventHub.$emit("fuzzyfy", deficiency.Dominios);
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
  watch: {
    dialog() {
      if (!this.dialog) {
        this.openDialog = false;
      }
    }
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

<style scoped>
.topbottom-margin {
  margin-bottom: 1em;
  margin-top: 1em;
}
.bottom-margin {
  margin-bottom: 1em;
}
</style>
