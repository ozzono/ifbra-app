<template>
  <div class="form">
    <v-container class="grey lighten-5">
      <div v-for="(funcao,i) in funcoes[0]" :key=i>
        {{i+1}}. {{funcao.Tipo}}
        <v-row v-for="(subfuncao,j) in funcao.SubFuncao" :key=j>{{i+1}}.{{j+1}} {{subfuncao.Tipo}}: {{subfuncao.Detalhe}}</v-row>          
        <hr>
      </div>
    </v-container>
  </div>
</template>
<script>
import Funcoes from "@/assets/json/form2.json";
export default {
data: () => ({
      funcoes: Object.values(Funcoes)
    })
}
</script>

<style>

</style>