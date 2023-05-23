<template>
  <div :class="`${!theme.dark ? theme.color : ''}`">
    <v-container class="form" :class="`${!theme.dark ? theme.color : ''}`">
      <FormHeader
        title="Formulário 1"
        subtitle="Identificação do Avaliado e da Avaliação"
        comment="Matriz"
      />
      <div :class="{ 'd-none': hide }">
        <v-row>
          <v-col>Dados do Avaliado</v-col>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="6" cols="12">
            <v-text-field
              v-model="fieldValues.name"
              :rules="required(fieldValues.name)"
              label="Nome completo"
              @change="updatePrintView()"
            />
          </v-col>
          <v-col md="3" cols="6">
            <v-text-field
              v-model="fieldValues.department"
              :rules="required(fieldValues.department)"
              label="Lotação"
              @change="updatePrintView()"
            />
          </v-col>
          <v-col md="3" cols="6">
            <CheckList
              inner-hint=""
              :inner-items="sexo"
              inner-label="Sexo"
              @selected-items="fieldValues.sex = $event"
              @changed="updatePrintView()"
              :rules="required(fieldValues.sex)"
            />
          </v-col>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="3" cols="6" justify="space-around">
            <DateDialog
              label="Data de nascimento"
              @inner-date="calcAge($event)"
              :default-date="(new Date().getFullYear() - 50).toString()"
              @date="fieldValues.birthday = $event"
            />
          </v-col>
          <v-col md="3" cols="6">
            <v-text-field
              label="Idade"
              v-model="idade"
              readonly
              disabled
              outlined
              :persistent-hint="idade.length == 0"
              hint="Calculada automaticamente"
              @change="updatePrintView()"
            />
          </v-col>
          <v-col md="3" cols="6">
            <v-text-field
              v-model="fieldValues.registry"
              :rules="required(fieldValues.registry)"
              label="Matrícula"
              @change="updatePrintView()"
            />
          </v-col>
          <v-col md="3" cols="6">
            <CheckList
              inner-hint=""
              :inner-items="Form[7]"
              inner-label="Etnia"
              @selected-items="fieldValues.ethnicity = $event"
              @changed="updatePrintView()"
            />
          </v-col>
        </v-row>
        <v-divider class="divider" />
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
              @changed="updatePrintView()"
            />
          </v-col>
          <v-col md="8" cols="10">
            <AutoComplete
              :allow-multiple="false"
              inner-label="Diagnóstico médico"
              :inner-hint="cidHint"
              @inner-change="cid = $event"
              @refill-cid="CID10[2] = $event"
              :require="true"
              ref="cid"
            />
          </v-col>
          <v-col
            md="1"
            cols="2"
            class="d-flex justify-center align-center text-center"
          >
            <v-btn @click="addCID()" icon align="center">
              <v-icon>mdi-plus-box</v-icon>
            </v-btn>
          </v-col>
          <v-row
            v-if="this.fieldValues.CID.length > 0"
            align="center"
            dense
            class="flex"
          >
            <v-col
              class="flex"
              v-for="cid in this.fieldValues.CID"
              :key="cid"
              cols="6"
              md="3"
            >
              <CIDFlex @inner-click="delCID(cid)" :text="cid" />
            </v-col>
          </v-row>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="10" cols="10">
            <v-text-field
              v-model="fieldValues.address"
              :rules="required(fieldValues.address)"
              label="Local da Avaliação"
              @change="updatePrintView()"
            />
          </v-col>
          <v-col md="2" cols="2">
            <CheckList
              inner-hint=""
              :inner-items="uf"
              inner-label="UF"
              @selected-items="fieldValues.UF = $event"
              @changed="updatePrintView()"
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
              @changed="updatePrintView()"
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
              @change="updatePrintView()"
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
              @change="updatePrintView()"
            />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import Form from "@/assets/json/form1.json";
import CID10 from "@/assets/json/cid10.min.json";
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    idade: "",
    sexo: ["Masculino", "Feminino"],
    hide: false,
    cid: "",
    cidHint: "CID",
    hideInformante: false,
    informante: {
      tipo: "",
      nome: "",
      readonly: true,
      disabled: true,
      hint: ""
    },
    uf: "AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MG,MS,PA,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,SP,SE,TO".split(
      ","
    ),
    fieldValues: {
      CID: []
    },
    Form: Object.values(Form),
    CID10: Object.values(CID10)
  }),
  components: {
    DateDialog: () => import("@/components/DateDialog"),
    AutoComplete: () => import("@/components/AutoComplete"),
    FormHeader: () => import("@/components/forms/FormHeader"),
    CheckList: () => import("@/components/CheckList"),
    CIDFlex: () => import("@/components/CIDFlex")
  },
  methods: {
    ...mapActions(["setInfo", "unlistCID", "refillCID", "fillCID"]),
    calcAge(date) {
      const splitted = date.split("/");
      var day = `${parseInt(splitted[0], 10) + 1}`.padStart(2, "0");
      const month = `${parseInt(splitted[1], 10)}`.padStart(2, "0");
      const year = `${parseInt(splitted[2], 10)}`.padStart(2, "0");
      date = `${year}-${month}-${day++}`;
      var today = new Date();
      var birthday = new Date(
        date
          .split("/")
          .reverse()
          .join("-")
      );
      var age = today.getFullYear() - birthday.getFullYear();
      var m = today.getMonth() - birthday.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--;
      }
      this.idade = isNaN(age) ? "Data inválida" : `${age} anos`;
      this.fieldValues.age = age;
      this.fieldValues.birthday = birthday.toISOString().substr(0, 10);
      this.updatePrintView();
    },
    showHide(status) {
      this.hide = status;
    },
    setInformante(informante) {
      if (this.$custom.normalize(informante) != "a propria pessoa") {
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
    required: val => [(val || "").length > 0 || "Campo obrigatório!"],
    addCID() {
      if (
        this.cid.length > 0 &&
        !this.fieldValues.CID.some(element => {
          return element === this.cid;
        })
      ) {
        this.fieldValues.CID.push(this.cid);
        this.$refs.cid.clear();
        this.unlistCID(this.cid);
        this.cidHint = "CID";
        this.cid = "";
      } else {
        this.$refs.cid.focus();
        this.cidHint = "Informe o CID";
      }
      this.updatePrintView();
    },
    delCID(cid) {
      this.fieldValues.CID = this.fieldValues.CID.filter(element => {
        if (element != cid) {
          return element;
        }
      });
      this.refillCID(cid);
    },
    updatePrintView() {
      this.setInfo({
        name: this.fieldValues.name || "",
        CID: this.fieldValues.CID || "",
        registry: this.fieldValues.registry || "",
        sex: this.fieldValues.sex || "",
        ethnicity: this.fieldValues.ethnicity || "",
        deficiencyType: this.fieldValues.deficiencyType || "",
        history: this.fieldValues.history || "",
        birthday: this.fieldValues.birthday || "",
        informant: this.fieldValues.informant || "",
        age: this.fieldValues.age || ""
      });
    }
  },
  computed: {
    ...mapGetters(["theme", "personal", "deficiencies"])
  },
  created() {
    this.fillCID(CID10.list);
  }
};
</script>

<style scoped>
.divider {
  margin-bottom: 1em;
}
</style>
