<template>
  <div class="form">
    <v-flex>
      <v-container class="grey lighten-5">
        <v-row align="center" dense class="flex">
          <FormHeader
            title="Formulário 1"
            subtitle="Identificação do Avaliado e da Avaliação"
            comment="Matriz"
          />
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="6" cols="12"> <!-- big col -->
            <v-text-field label="Nome completo" />
          </v-col>
          <v-col md="3" cols="6"> <!-- small col -->
            <v-text-field label="Lotação" />
          </v-col>
          <v-col md="3" cols="6"> <!-- small col -->
            <CheckList
              :innerItems="sexo"
              innerLabel="Sexo"
            ></CheckList>
          </v-col>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="3" cols="6"> <!-- small col -->
            <v-text-field label="Matrícula" />
          </v-col>
          <v-col md="3" cols="6" justify="space-around"> <!-- small col -->
            <v-row align="center" dense >
              <DatePicker innerLabel="Data de nascimento"/>
            </v-row>
          </v-col>
          <v-col md="3" cols="6"> <!-- small col -->
            <v-text-field label="Idade" disabled filled/>
          </v-col>
          <v-col md="3" cols="6"> <!-- small col -->
            <CheckList
              :innerItems="Form[7]"
              innerLabel="Etnia"
            ></CheckList>
          </v-col>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-card-subtitle>Tipo de Deficiência</v-card-subtitle>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="3" cols="6"> <!-- small col -->
            <CheckList
              :innerItems="Form[6]"
              allowMultiple="true"
            ></CheckList>
          </v-col>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-card-subtitle>Diagnóstico Médico</v-card-subtitle>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="6" cols="12"> <!-- big col -->
            <AutoComplete :innerItems="CID10[2]" allowMultiple="true" innerLabel="CID"/>
          </v-col>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="11" cols="11"> <!-- big col -->
            <v-text-field label="Local da Avaliação" />
          </v-col>
          <v-col md="1" cols="1"> <!-- big col -->
            <CheckList :innerItems="uf" innerLabel="UF"/>
          </v-col>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="3" cols="6"> <!-- small col -->
            <CheckList :innerItems="Form[8].Informante" innerLabel="Quem prestou as informações"/>
          </v-col>
          <v-col md="3" cols="6"> <!-- small col -->
            <v-text-field label="Informante" />
          </v-col>
        </v-row>
        <v-row align="center" dense class="flex">
          <v-col md="12" cols="12"> <!-- big col -->
            <v-textarea
              clearable
              label="Histórico clínico e social"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
import Form from "@/assets/json/form1.json";
import CID10 from "@/assets/json/cid10.min.json";
import DatePicker from "@/components/DatePicker";
import CheckList from "@/components/CheckList";
import AutoComplete from "@/components/AutoComplete";
import FormHeader from "@/components/forms/FormHeader";
export default {
  data: () => ({
    sexo:['Masculino','Feminino'],
    uf:[ "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MG", "MS", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO", ],
    Form: Object.values(Form),
    CID10: Object.values(CID10),
  }),
  components:{
    DatePicker:DatePicker,
    FormHeader:FormHeader,
    AutoComplete:AutoComplete,
    CheckList:CheckList,
  },
}
</script>