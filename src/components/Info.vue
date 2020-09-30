<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center justify-center">
        <h1 class="font-weight-bold display-3">
          Informações Legais
        </h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" grow>
        <v-tab>
          Legenda
        </v-tab>
        <v-tab>Manual</v-tab>
        <v-tab>CID10</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <Helper />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>Manual</v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>CID10</v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tab: null,
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    };
  },
  components: {
    Helper: () => import("@/components/Helper")
  }
};
</script>

<style></style>
