<template>
  <v-container :class="`${theme.dark ? '' : theme.color}`">
    <v-card
      flat
      tile
      :class="
        `d-flex flex-row justify-start align-center
        ${theme.dark ? '' : theme.color}
        `
      "
      @click="newTab('cid10')"
    >
      <ManualIcon
        :left="true"
        ref="cid10"
        icon="mdi-code-array"
        :url="CID10[0]"
      />
      <LighterTextField
        title="Lista de códigos e descrições do CID10"
        :subtitle="
          `Lista atualizada em ${CID10[1]
            .split('-')
            .reverse()
            .join('/')}`
        "
        :text="[
          'Clique para visualizar página oficial de Morbidade Hospitalar do DataSuS com a Lista de Tabulação do CID10 contendo todos os códigos e respectivas descrições completas e detalhadas.'
        ]"
        comment=""
      />
    </v-card>
    <v-card flat :class="`${theme.dark ? '' : theme.color}`">
      <v-container>
        <AutoComplete
          :inner-items="CID10[2]"
          :allow-multiple="false"
          inner-label="Procurar CID"
          inner-hint="Consulte por código ou descrição de diagnóstico"
          :make-clearable="true"
        />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import CID10 from "@/assets/json/cid10.min.json";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    CID10: Object.values(CID10)
  }),
  components: {
    AutoComplete: () => import("@/components/AutoComplete"),
    ManualIcon: () => import("@/components/ManualIcon"),
    LighterTextField: () => import("@/components/LighterTextField")
  },
  computed: mapGetters(["theme"]),
  methods: {
    newTab(ref) {
      this.$refs[ref].newTab();
    }
  }
};
</script>

<style></style>
