<template>
  <div class="form" :class="`${!theme.dark ? theme.color : ''}`">
    <v-flex>
      <v-container>
        <FormHeader
          title="Formulário 1"
          subtitle="Identificação do Avaliado e da Avaliação"
          comment="Matriz"
          @toggle="showHide($event)"
        />
        <div v-bind:class="{ 'd-none': hide }">
          <v-row align="center" dense class="flex">
            <v-col md="6" cols="12">
              <v-text-field label="Nome completo" />
            </v-col>
            <v-col md="3" cols="6">
              <v-text-field label="Lotação" />
            </v-col>
            <v-col md="3" cols="6">
              <CheckList :inner-items="sexo" inner-label="Sexo"></CheckList>
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="3" cols="6">
              <v-text-field label="Matrícula" />
            </v-col>
            <v-col md="3" cols="6" justify="space-around">
              <BirthdayPicker
                inner-label="Data de nascimento"
                @datechange="calcAge($event)"
                startYear="70"
              />
            </v-col>
            <v-col md="3" cols="6">
              <v-text-field
                label="Idade"
                v-model="idade.text"
                readonly
                disabled
                outlined
                :persistent-hint="idade.text.length == 0"
                hint="Calculada automaticamente"
                @click="customBlur()"
              />
            </v-col>
            <v-col md="3" cols="6">
              <CheckList :inner-items="Form[7]" inner-label="Etnia"></CheckList>
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-card-subtitle>Tipo de Deficiência</v-card-subtitle>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="3" cols="6">
              <CheckList
                :inner-items="Form[6]"
                :allow-multiple="true"
              ></CheckList>
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-card-subtitle>Diagnóstico Médico</v-card-subtitle>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="6" cols="12">
              <AutoComplete
                :inner-items="CID10[2]"
                :allow-multiple="true"
                inner-label="CID"
              />
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="10" cols="10">
              <v-text-field label="Local da Avaliação" />
            </v-col>
            <v-col md="2" cols="2">
              <CheckList :inner-items="uf" inner-label="UF" />
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="3" cols="6">
              <CheckList
                :inner-items="Form[8].Informante"
                inner-label="Quem prestou as informações"
                @selected-items="setInformante($event)"
              />
            </v-col>
            <v-col md="3" cols="6">
              <v-text-field
                id="informante"
                label="Informante"
                v-model="informante.nome"
                :readonly="informante.readonly"
                :disabled="informante.disabled"
                :hint="informante.hint"
                :persistent-hint="informante.hint.length > 0"
                @blur="blurInformante()"
                ref="informante"
                v-if="!hideInformante"
              />
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="12" cols="12">
              <v-textarea
                clearable
                label="Histórico clínico e social"
              ></v-textarea>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Form from "@/assets/json/form1.json";
import CID10 from "@/assets/json/cid10.min.json";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    idade: { number: 0, text: "" },
    sexo: ["Masculino", "Feminino"],
    hide: false,
    hideInformante: false,
    informante: {
      tipo: "",
      nome: "",
      readonly: true,
      disabled: true,
      hint: ""
    },
    uf: "AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MG,MS,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,SP,SE,TO".split(
      ","
    ),
    Form: Object.values(Form),
    CID10: Object.values(CID10)
  }),
  components: {
    BirthdayPicker: () => import("@/components/BirthdayPicker"),
    AutoComplete: () => import("@/components/AutoComplete"),
    FormHeader: () => import("@/components/forms/FormHeader"),
    CheckList: () => import("@/components/CheckList")
  },
  methods: {
    calcAge(date) {
      var today = new Date();
      var birthDate = new Date(date);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.idade.number = age;
      this.idade.text = `${age} anos`;
    },
    showHide(status) {
      this.hide = status;
    },
    normalize(input) {
      return input
        .split(" ")
        .reduce((output, item) => {
          return [
            ...output,
            item
              .normalize("NFD")
              .replace(/[^a-zA-Zs]/g, "")
              .toLowerCase()
          ];
        }, [])
        .join(" ");
    },
    setInformante(informante) {
      if (this.normalize(informante) != "a propria pessoa") {
        this.informante.readonly = false;
        this.informante.disabled = false;
        this.informante.hint = "Insira o nome do informante";
        this.$nextTick(() => this.$refs.informante.focus());
        this.hideInformante = false;
      } else {
        this.hideInformante = true;
        this.informante.readonly = true;
        this.informante.disabled = true;
        this.informante.hint = "";
        this.informante.nome = "";
      }
    },
    blurInformante() {
      this.informante.hint = "";
    },
    customBlur() {
      let el = this.$el.querySelector(":focus");
      if (el) el.blur();
    }
  },
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>
