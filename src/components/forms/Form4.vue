<template>
  <div class="form">
    <v-flex>
      <v-container class="grey lighten-5">
        <FormHeader
          title="Formulário 4"
          subtitle="Aplicação do Modelo Linguístico Fuzzy"
          comment=""
        />
        <v-row class="d-flex">
          <v-col :cols="ContentCols">
            Domínios e Atividades
          </v-col>
        </v-row>
        <v-row dense v-for="(deficiecia,i) in Deficiencias" :key="i">
          <v-col cols="2">
            {{deficiecia.Desc}}
          </v-col>
          <v-col cols="1">
            <RowSwitch></RowSwitch>
          </v-col>
          <v-col>
            {{deficiecia.Obs}}
          </v-col>
          <v-col cols="1">
            <RowSwitch></RowSwitch>
          </v-col>
          <v-col>
            Houve pontuação 25,50 ou 75 em alguma atividade do Domínio {{deficiecia.Dominios}}
          </v-col>
        </v-row>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
import FormHeader from "@/components/forms/FormHeader"
import RowSwitch from "@/components/RowSwitch"
import Deficiencias from "@/assets/json/form4.json"
export default {
    data: () => ({
      Deficiencias: Object.values(Deficiencias)
    }),
    components:{
        FormHeader:FormHeader,
        RowSwitch:RowSwitch,
    }
}
</script>