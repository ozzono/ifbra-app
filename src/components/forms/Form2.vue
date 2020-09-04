<template>
  <div class="form">
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
            {{ i + 1 }}. {{ funcao.Tipo }}
            <div
              class="d-flex"
              no-gutters
              v-for="(subfuncao, j) in funcao.SubFuncao"
              :key="j"
            >
              <div cols="pa-1">
                <RowSwitch></RowSwitch>
              </div>
              <div cols="pa-11" class="align-self-center">
                {{ i + 1 }}.{{ j + 1 }} {{ subfuncao.Tipo }}:
                {{ subfuncao.Detalhe }}
              </div>
            </div>
            <hr />
          </div>
        </div>
      </v-container>
    </v-flex>
  </div>
</template>
<script>
/* eslint-disable no-console */
import Funcoes from "@/assets/json/form2.json";
import RowSwitch from "@/components/RowSwitch";
import FormHeader from "@/components/forms/FormHeader";
export default {
  data: () => ({
    funcoes: Object.values(Funcoes),
    hide: false
  }),
  components: {
    RowSwitch: RowSwitch,
    FormHeader: FormHeader
  },
  methods: {
    showHide(status) {
      this.hide = status;
    }
  }
};
</script>

<style></style>
