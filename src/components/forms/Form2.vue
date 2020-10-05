<template>
  <div class="form" :class="`${!theme.dark ? theme.color : ''}`">
    <v-flex>
      <v-container>
        <FormHeader
          title="Formulário 2"
          subtitle="Funções corporais acometidas"
          comment="a ser preenchido pelo médico perito"
        />
        <div>
          <div v-for="(funcao, i) in funcoes" :key="i">
            <v-divider v-if="i > 0" />
            <v-row>
              <v-col class="wrap">
                <LighterTextField
                  :title="`${i + 1}. ${funcao.Tipo}`"
                  subtitle=""
                  comment=""
                />
              </v-col>
            </v-row>
            <v-row
              no-gutters
              v-for="(subfuncao, j) in funcao.SubFuncao"
              :key="j"
            >
              <v-col
                cols="2"
                :class="`align-center d-flex ${width >= 960 ? 'md' : 'sm'}`"
              >
                <RowSwitch @switch-change="updateSubFunction({ i: i, j: j })" />
              </v-col>
              <v-col cols="10">
                <LighterTextField
                  :title="`${i + 1}.${j + 1} ${subfuncao.Tipo}:`"
                  :subtitle="`${subfuncao.Detalhe}`"
                  comment=""
                />
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
import Funcoes from "@/assets/json/form2.json";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({ funcoes: Object.values(Funcoes), width: 0 }),
  components: {
    LighterTextField: () => import("@/components/LighterTextField"),
    RowSwitch: () => import("@/components/RowSwitch"),
    FormHeader: () => import("@/components/forms/FormHeader")
  },
  mounted() {
    window.addEventListener("resize", this.setWidth);
  },
  methods: {
    setWidth() {
      this.width = window.innerWidth;
    },
    log: n => console.log(n),
    ...mapActions(["setFunctions", "updateSubFunction"])
  },
  created() {
    this.setWidth();
    this.setFunctions(this.funcoes);
  },
  computed: mapGetters(["theme", "bodyFunctions"])
};
</script>

<style scoped>
.wrap {
  word-wrap: break-word;
}
.md {
  padding-left: 2.7rem;
}
</style>
