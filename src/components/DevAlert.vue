<template>
  <v-card>
    <v-card
      height="6rem"
      class="d-flex justify-center align-center flex-row amber darken-4 yellow--text"
    >
      <v-card flat class="upscale amber darken-4 yellow--text">
        <v-icon x-large>mdi-alert-box</v-icon>
      </v-card>
      <h1 flat tile class="margin-1 amber darken-4 yellow--text">
        Esta página está em desenvolvimento.
      </h1>
      <v-card flat class="upscale amber darken-4 yellow--text">
        <v-icon x-large>mdi-alert-box</v-icon>
      </v-card>
    </v-card>
  </v-card>
</template>

<style scoped>
.upscale {
  transform: scale(1.8, 1.8);
  padding-left: 1rem;
  padding-right: 1rem;
}
.margin-1 {
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
