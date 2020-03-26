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
// import axios from "axios";

export default {
  data: () => ({
    funcoes: [],
    errors:[]
  }),
  created: function() {
    fetch('http://localhost:8000/form2.json').then((response) => {
      response.json().then((json) => {
        this.funcoes.push(json.Funcoes)
      })
    })
    .catch(error => {this.errors.push(error)})
  }
}
</script>