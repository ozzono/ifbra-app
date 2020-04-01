<template>
    <div>
      <li v-for="(funcao,index) of funcoes" :key="index">
        {{ funcao.Tipo }}
      </li>
        <div>
            {{errors}}
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    funcoes: [],
    errors:[]
  }),
  mounted () {
    axios(
      'http://ifbra-forms.appspot.com/form2.json',
        {
          method:"GET",
          crossdomain: true,
        },
      )
      .then(response => {
        // JSON responses are automatically parsed.
        this.funcoes = response.data.Funcao;
      })
      .catch(error => {this.errors.push(error)})
  }
}
</script>