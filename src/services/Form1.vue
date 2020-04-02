<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="forms.Nome"
            :rules="nameRules"
            :counter="10"
            label="Nome"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="lastname"
            :rules="nameRules"
            :counter="10"
            label="Last name"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>


<script>
import axios from "axios";
export default {
  data: () => ({
    valid:true,
    form: "",
    errors: []
  }),
  mounted() {
    axios("http://ifbra-forms.appspot.com/form1.json", {
      method: "GET",
      crossdomain: true
    })
      .then(response => {
        // JSON responses are automatically parsed.
        this.funcoes = response.data.Funcao;
      })
      .catch(error => {
        this.errors.push(error);
      });
  }
};
</script>
<style>

</style>