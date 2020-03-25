<template>
    <div>
        {{ funcoes }}
        <!-- <div v-for="(err,index) in data.errors" :key="index"> -->
        <div>
            {{errors}}
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      funcoes: [],
      errors:[]
    }
  },
  mounted () {
    axios.get("https://ifbra-forms.appspot.com/forms/2")
    .then(response => {this.funcoes.push(response.data.Funcoes)})
    .catch(error => {this.errors.push(error)})
  }
};
</script>
