<template>
  <v-footer
    padless
    :class="
      `d-flex justify-center align-center ${!theme.dark ? theme.color : ''}`
    "
  >
    <v-card
      :class="
        `d-flex
        justify-center align-center
        ${!theme.dark ? theme.color : ''}
        ${width < 960 ? 'flex-column' : 'flex-row'}
        `
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
      </v-card>
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
        <v-icon class="hidden-sm-and-down">mdi-ray-vertex</v-icon>
      </v-card>
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
        <span class="right-pad">Desenvolvido por</span>
        <a href="https://www.linkedin.com/in/hugo-virgilio/">
          Hugo Virgílio&nbsp;
        </a>
        <a href="https://www.linkedin.com/in/hugo-virgilio/">
          <v-icon dense>mdi-linkedin-box</v-icon>
        </a>
      </v-card>
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
        <v-icon class="hidden-sm-and-down">mdi-ray-vertex</v-icon>
      </v-card>
      <v-card
        height="3rem"
        flat
        tile
        :class="`d-flex align-center ${!theme.dark ? theme.color : ''}`"
      >
        <a href="https://github.com/ozzono/ifbra-app">
          Código aberto&nbsp;
        </a>
        <a href="https://github.com/ozzono/ifbra-app">
          <v-icon dense>mdi-github-circle</v-icon>
        </a>
      </v-card>
    </v-card>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    width: "flex-column"
  }),
  name: "VuetifyFooter",
  computed: mapGetters(["theme"]),
  methods: {
    setWidth() {
      this.width = window.innerWidth;
    }
  },
  mounted() {
    this.$eventHub.$on("resize", this.setWidth);
  }
};
</script>

<style scoped>
.left-pad {
  padding-left: 1rem;
}
.right-pad {
  padding-right: 0.3rem;
}
</style>
