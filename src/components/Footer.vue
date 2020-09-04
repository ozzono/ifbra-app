<template>
  <v-footer padless>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — Desenvolvido por Hugo Virgílio —
      <a href="https://github.com/synini/ifbra-app">
        Código aberto <v-icon>mdi-github-circle</v-icon>
      </a>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "VuetifyFooter"
};
</script>
