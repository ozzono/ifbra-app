<template>
  <v-footer
    padless
    :class="
      `d-flex justify-center align-center ${!theme.dark ? theme.color : ''}`
    "
  >
    <v-card
      :class="
        `d-flex flex-row justify-center align-center ${
          !theme.dark ? theme.color : ''
        }`
      "
      cols="12"
      width="100%"
      flat
      height="5rem"
    >
      <v-card
        height="3rem"
        flat
        tile
        :class="
          `d-flex text-center align-center right-pad
          ${!theme.dark ? theme.color : ''}
          `
        "
      >
        {{ new Date().getFullYear() }}
        <span class="left-pad right-pad hidden-sm-and-down">—</span>
        Desenvolvido por
      </v-card>
      <v-card
        height="3rem"
        flat
        tile
        :class="`btn d-flex align-center ${!theme.dark ? theme.color : ''}`"
      >
        <a
          href="https://www.linkedin.com/in/hugo-virg%C3%ADlio-guedes-brand%C3%A3o-ab6a5158/"
        >
          Hugo Virgílio <v-icon dense>mdi-linkedin-box</v-icon>
        </a>
      </v-card>
      <span class="hidden-sm-and-down">—</span>
      <v-card
        height="3rem"
        flat
        tile
        :class="
          `d-flex align-center left-pad ${!theme.dark ? theme.color : ''}`
        "
      >
        <a href="https://github.com/synini/ifbra-app">
          Código aberto <v-icon dense>mdi-github-circle</v-icon>
        </a>
      </v-card>
      <v-card
        height="3rem"
        flat
        tile
        :class="`d-flex align-center ${!theme.dark ? theme.color : ''}`"
      >
      </v-card>
      <v-card
        height="3rem"
        flat
        tile
        :class="
          `d-flex align-center left-pad ${!theme.dark ? theme.color : ''}`
        "
      >
      </v-card>
    </v-card>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "VuetifyFooter",
  computed: mapGetters(["theme"])
};
</script>

<style scoped>
.left-pad {
  padding-left: 1rem;
}
.right-pad {
  padding-right: 1rem;
}
</style>
