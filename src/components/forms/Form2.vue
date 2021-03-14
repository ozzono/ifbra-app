<template>
  <div :class="`${theme.dark ? '' : theme.color}`">
    <v-container :class="`${theme.dark ? '' : theme.color}`">
      <FormHeader
        title="Formulário 2"
        subtitle="Funções corporais acometidas"
        comment="a ser preenchido pelo médico perito"
      />
      <v-card
        flat
        tile
        v-for="(funcao, i) in funcoes"
        :key="i"
        :class="`${theme.dark ? '' : theme.color}`"
      >
        <v-divider v-if="i > 0" />
        <v-card flat tile class="wrap">
          <LighterTextField
            :title="`${i + 1}. ${funcao.Tipo}`"
            subtitle=""
            comment=""
          />
        </v-card>
        <v-card
          flat
          tile
          no-gutters
          v-for="(subfuncao, j) in funcao.SubFuncao"
          :key="j"
          :class="
            `d-flex align-center flex-row pad-me
            ${theme.dark ? '' : theme.color}`
          "
          hover
          @click="switchRow({ i, j })"
        >
          <v-card
            flat
            tile
            :class="`align-center d-flex ${theme.dark ? '' : theme.color}`"
          >
            <RowSwitch :ref="`row-${i}-${j}`" />
          </v-card>
          <v-card tile flat>
            <LighterTextField
              :title="`${i + 1}.${j + 1} ${subfuncao.Tipo}:`"
              :subtitle="`${subfuncao.Detalhe}`"
              comment=""
            />
          </v-card>
        </v-card>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import Funcoes from "@/assets/json/form2.json";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    funcoes: Object.values(Funcoes),
    width: 0
  }),
  components: {
    LighterTextField: () => import("@/components/LighterTextField"),
    RowSwitch: () => import("@/components/RowSwitch"),
    FormHeader: () => import("@/components/forms/FormHeader")
  },
  mounted() {
    this.$eventHub.$on("resize", this.setWidth);
  },
  methods: {
    setWidth() {
      this.width = window.innerWidth;
    },
    switchRow({ i, j }) {
      const ref = `row-${i}-${j}`.toString();
      this.$refs[ref][0].innerChange();
      this.updateSubFunction({ i: i, j: j });
      this.$eventHub.$emit("force-blur");
    },
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
.pad-me {
  padding-left: 3rem;
  padding-right: 3rem;
}
</style>
