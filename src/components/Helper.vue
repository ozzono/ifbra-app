<template>
  <div :class="`${!theme.dark ? theme.color : ''}`">
    <v-card :class="`${!theme.dark ? theme.color : ''}`">
      <v-tabs vertical v-model="tab" grow background-color="transparent">
        <v-tab class="d-flex justify-start">
          Detalhamento de pontuação do INSS
        </v-tab>
        <v-tab class="d-flex justify-start">
          Descrição das Barreiras
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <INSS />
        </v-tab-item>
        <v-tab-item>
          <Barriers />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Helper",
  data: () => ({
    tab: null
  }),
  computed: mapGetters(["theme"]),
  components: {
    INSS: () => import("@/components/INSS"),
    Barriers: () => import("@/components/Barriers")
  }
};
</script>

<style scoped>
h3 {
  padding-top: 1rem;
}
.vertical {
  transform: rotate(270deg);
}
.wrap {
  width: 1ch;
  word-break: break-all;
}
.vertical-pad {
  font-size: 80%;
  margin-top: 1rem;
}
</style>
