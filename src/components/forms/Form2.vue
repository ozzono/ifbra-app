<template>
  <div class="form" :class="`${!theme.dark ? theme.color : ''}`">
    <v-flex>
      <v-container>
        <FormHeader
          title="Formulário 2"
          subtitle="Funções corporais acometidas"
          comment="a ser preenchido pelo médico perito"
          @toggle="showHide($event)"
        />
        <div v-bind:class="{ 'd-none': hide }">
          <div v-for="(funcao, i) in funcoes[0]" :key="i">
            <v-divider v-if="i > 0" />
            <v-row>
              <v-col class="wrap">
                <BaseTextField
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
              <v-col cols="2" class="align-center d-flex justify-center">
                <RowSwitch />
              </v-col>
              <v-col cols="10">
                <BaseTextField
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
import { mapGetters } from "vuex";
export default {
  data: () => ({ funcoes: Object.values(Funcoes), hide: false, width: 0 }),
  components: {
    BaseTextField: () => import("@/components/BaseTextField"),
    RowSwitch: () => import("@/components/RowSwitch"),
    FormHeader: () => import("@/components/forms/FormHeader")
  },
  mounted() {
    window.addEventListener("resize", this.setWidth);
  },
  methods: {
    showHide(status) {
      this.hide = status;
    },
    setWidth() {
      this.width = window.innerWidth;
    }
  },
  created() {
    this.setWidth();
  },
  computed: mapGetters(["theme"])
};
</script>

<style scoped>
.wrap{
  word-wrap: break-word;
}
</style>