<template>
  <div class="form">
    <v-flex>
      <v-container class="grey lighten-5">
        <FormHeader
            title="Formulário 3"
            subtitle="Aplicação do Instrumento"
            comment="Matriz"
        />
        <v-row class="d-flex">
          <v-col :cols="ContentCols">
            Domínios e Atividades
          </v-col>
          <v-col class="text-center" :cols="SelectCols*2">
            Pontuação INSS
          </v-col>
          <v-col class="text-center" :cols="CheckListCols">
            Barreira Ambiental
          </v-col>
        </v-row>
        <div text-wrap v-for="(dominio,i) in Dominios" :key=i>
          {{i+1}}. {{dominio.Desc}}
          <v-row class="d-flex" dense v-for="(subdominio,j) in dominio.SubDominios" :key=j>
            <v-col class="align-start" :cols="ContentCols">
              <v-textarea
                :value="subdominio.Detalhe"
                :label="(i+1)+'.'+(j+1)+' '+subdominio.Desc"
                rows="1"
                disabled
                auto-grow
                class="align-start"
              ></v-textarea>
            </v-col>
            <v-col class="align-start justify-md-end" :cols="SelectCols">
                <INSSSelect></INSSSelect>
            </v-col>
            <v-col class="align-start justify-md-end" :cols="SelectCols">
                <INSSSelect></INSSSelect>
            </v-col>
            <v-col class="align-start" :cols="CheckListCols">
                <Barreiras></Barreiras>
            </v-col>
          </v-row>
          <hr>
        </div>
      </v-container>
    </v-flex>
  </div>
</template>
<script>
import Dominios from "@/assets/json/form3.json";
import FormHeader from "@/components/forms/FormHeader";
import INSSSelect from "@/components/forms/INSSSelect";
import Barreiras from "@/components/Barreiras";
export default {
    data: () => ({
      ContentCols:8,
      SelectCols:1,
      CheckListCols:2,
      Dominios: Object.values(Dominios)

    }),
    components:{
      FormHeader:FormHeader,
      Barreiras:Barreiras,
      INSSSelect:INSSSelect,
    }
}
</script>

<style>
  :disabled{
    color: black !important;
  }
  v-textarea{
    border-style: none;
  }
</style>