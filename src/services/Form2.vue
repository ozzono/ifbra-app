<template>
    <div id="app">
        {{ funcoes }}
    </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      funcoes: []
    }
  },
  mounted () {
    axios.get("https://ifbra-forms.appspot.com/forms/2")
      .then(response => {this.funcoes = response.data})
  }
};
</script>
