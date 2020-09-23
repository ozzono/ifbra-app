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
          <v-row>
            <v-col>Dados do Avaliado</v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="6" cols="12">
              <v-text-field
                v-model="fieldValues.name"
                :rules="required(fieldValues.name)"
                label="Nome completo"
              />
            </v-col>
            <v-col md="3" cols="6">
              <v-text-field
                v-model="fieldValues.department"
                :rules="required(fieldValues.department)"
                label="Lotação"
              />
            </v-col>
            <v-col md="3" cols="6">
              <CheckList
                inner-hint=""
                :inner-items="sexo"
                inner-label="Sexo"
                @selected-items="fieldValues.sex = $event"
                :rules="required(fieldValues.sex)"
              ></CheckList>
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="3" cols="6" justify="space-around">
              <BirthdayPicker
                inner-label="Data de nascimento"
                @date-change="calcAge($event)"
                startYear="70"
                @date="fieldValues.birthday = $event"
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
              />
            </v-col>
            <v-col md="3" cols="6">
              <v-text-field
                v-model="fieldValues.registry"
                :rules="required(fieldValues.registry)"
                label="Matrícula"
              />
            </v-col>
            <v-col md="3" cols="6">
              <CheckList
                inner-hint=""
                :inner-items="Form[7]"
                inner-label="Etnia"
                @selected-items="fieldValues.ethnicity = $event"
              ></CheckList>
            </v-col>
          </v-row>
          <v-divider />
          <v-row>
            <v-col>Dados da Avaliação</v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="3" cols="6">
              <CheckList
                inner-hint=""
                inner-label="Tipo de Deficiência"
                :inner-items="Form[6]"
                :allow-multiple="true"
                @selected-items="fieldValues.deficiencyType = $event"
              ></CheckList>
            </v-col>
            <v-col md="9" cols="12">
              <AutoComplete
                :inner-items="CID10[2]"
                :allow-multiple="true"
                inner-label="Diagnóstico médico"
                inner-hint="CID"
                @inner-blur="fieldValues.CID = $event"
                :rules="required(fieldValues.CID)"
              />
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="10" cols="10">
              <v-text-field
                v-model="fieldValues.address"
                :rules="required(fieldValues.address)"
                label="Local da Avaliação"
              />
            </v-col>
            <v-col md="2" cols="2">
              <CheckList
                inner-hint=""
                :inner-items="uf"
                inner-label="UF"
                @selected-items="fieldValues.UF = $event"
              />
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="3" cols="6">
              <CheckList
                inner-hint=""
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
                :rules="required(informante.nome)"
              />
            </v-col>
          </v-row>
          <v-row align="center" dense class="flex">
            <v-col md="12" cols="12">
              <v-textarea
                clearable
                label="Histórico clínico e social"
                v-model="fieldValues.history"
                :rules="required(fieldValues.history)"
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
import { mapActions, mapGetters } from "vuex";
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
    fieldValues: {},
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
    ...mapActions(["setInfo"]),
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
      this.fieldValues.age = age;
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
      if (this.fieldValues.informant == undefined) {
        this.fieldValues.informant = { type: "", name: "" };
      }
      this.fieldValues.informant.type = informante;
    },
    blurInformante() {
      if (this.informante.nome.length > 0) {
        this.informante.hint = "";
      }
      this.fieldValues.informant.name = this.informante.nome;
    },
    required: val => [(val || "").length > 0 || "Campo obrigatório!"]
  },
  computed: {
    ...mapGetters(["theme", "personal"])
  }
};
</script>
