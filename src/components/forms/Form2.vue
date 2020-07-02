<template>
  <div class="form">
    <v-banner>
      <h5>Formulário 2</h5>
      <h6>Funções corporais acometidas <i>(a ser preenchido pelo médico perito)</i></h6>
      <v-container class="grey lighten-5">
        <div v-for="(funcao,i) in funcoes[0]" :key=i>
          {{i+1}}. {{funcao.Tipo}}
          <div class="d-flex" no-gutters v-for="(subfuncao,j) in funcao.SubFuncao" :key=j>
            <div cols="pa-1">
              <RowSwitch>Rowswitch</RowSwitch>
            </div>
            <div cols="pa-11" class="align-self-center">
              {{i+1}}.{{j+1}} {{subfuncao.Tipo}}: {{subfuncao.Detalhe}}
            </div>
          </div>
          <hr>
        </div>
      </v-container>
    </v-banner>
  </div>
</template>
<script>
import Funcoes from "@/assets/json/form2.json";
import RowSwitch from "@/components/RowSwitch";
export default {
    data: () => ({
      funcoes: Object.values(Funcoes)
    }),
    components:{
      RowSwitch:RowSwitch
    }
}
</script>

<style>

</style>