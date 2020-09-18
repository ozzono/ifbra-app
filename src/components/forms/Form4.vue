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
              <BaseTextField
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
                        :innerLabel="
                          `Houve pontuação 25 ou 50 em alguma atividade dos domínios ${deficiecia.Dominios.join(
                            ' ou '
                          )}; OU Houve pontuação 75 em todas atividade dos domínios ${deficiecia.Dominios.join(
                            ' ou '
                          )}`
                        "
                        :dominios="deficiecia.Dominios"
                        :read-only="true"
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
    printFuzzy: {}
  }),
  components: {
    FuzzySwitch: () => import("@/components/FuzzySwitch"),
    BaseTextField: () => import("@/components/BaseTextField"),
    FormHeader: () => import("@/components/forms/FormHeader")
  },
  computed: {
    ...mapGetters(["fuzzy", "theme"])
  },
  methods: {
    strNormalize(str) {
      return str
        .split(" ")
        .normalize("NFD")
        .replace(/[^a-zA-Zs]/g, "")
        .join(" ");
    },
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
    ...mapActions(["makePrintFuzzy", "updatePrintFuzzy"])
  },
  created() {
    this.$eventHub.$emit("score");
    this.makePrintFuzzy(Fuzzy);
    this.setFuzzySwitch();
  }
};
</script>
