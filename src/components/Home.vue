<template>
  <v-card :class="`${theme.dark ? '' : theme.color}`">
    <Evaluation />
    <v-container>
      <v-tabs
        class="hidden-sm-and-down tab-title"
        v-model="tab"
        background-color="transparent"
        grow
      >
        <v-tab v-for="(item, n) in tabData" :key="n" width="100%">
          <TabTitle :title="`Formulário ${n + 1}`" />
          <!-- Formulário {{ n + 1 }} -->
        </v-tab>
      </v-tabs>
      <v-tabs
        class="hidden-md-and-up"
        vertical
        v-model="tab"
        grow
        background-color="transparent"
      >
        <v-tab
          v-for="(item, n) in tabData"
          :key="n"
          class="d-flex justify-start"
        >
          Formulário {{ n + 1 }}
        </v-tab>
      </v-tabs>
    </v-container>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Form1 />
      </v-tab-item>
      <v-tab-item>
        <Form2 />
      </v-tab-item>
      <v-tab-item eager>
        <Form3 />
      </v-tab-item>
      <v-tab-item eager>
        <Form4 />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {
    Evaluation: () => import("@/components/Evaluation"),
    TabTitle: () => import("@/components/TabTitle"),
    Form1: () => import("@/components/forms/Form1"),
    Form2: () => import("@/components/forms/Form2"),
    Form3: () => import("@/components/forms/Form3"),
    Form4: () => import("@/components/forms/Form4")
  },
  data: () => ({
    tab: null,
    tabData: [
      {
        subtitle: "Identificação do Avaliado e da Avaliação",
        comment: "Matriz"
      },
      {
        subtitle: "Funções corporais acometidas",
        comment: "a ser preenchido pelo médico perito"
      },
      {
        subtitle: "Aplicação do Instrumento",
        comment: "Matriz"
      },
      {
        subtitle: "Aplicação do Modelo Linguístico Fuzzy",
        comment: ""
      }
    ],
    eager: [false, false, false]
  }),
  computed: mapGetters(["theme"])
};
</script>
<style>
@media only print {
  .print-hidden {
    display: none;
  }
}
.tab-title {
  font-size: 3em;
}
</style>
