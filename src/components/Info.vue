<template>
  <div :class="`${theme.dark ? '' : theme.color}`">
    <v-container :class="`${theme.dark ? '' : theme.color}`">
      <v-card flat :class="`${theme.dark ? '' : theme.color}`">
        <v-card-title class="text-center justify-center">
          <h1 class="font-weight-bold display-3">
            Informações Legais
          </h1>
        </v-card-title>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          vertical
          grow
          class="hidden-md-and-up"
        >
          <v-tab class="d-flex justify-start">
            Legenda
          </v-tab>
          <v-tab class="d-flex justify-start">
            Manual e Informações Legais
          </v-tab>
          <v-tab class="d-flex justify-start">
            CID10
          </v-tab>
        </v-tabs>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          class="hidden-sm-and-down"
          grow
        >
          <v-tab>
            Legenda
          </v-tab>
          <v-tab>
            Manual e Informações Legais
          </v-tab>
          <v-tab>
            CID10
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item>
            <Helper />
          </v-tab-item>
          <v-tab-item>
            <Manual />
          </v-tab-item>
          <v-tab-item>
            <CID10 />
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tab: null
    };
  },
  components: {
    Helper: () => import("@/components/Helper"),
    Manual: () => import("@/components/Manual"),
    CID10: () => import("@/components/CID10")
  },
  computed: mapGetters(["theme"])
};
</script>

<style></style>
