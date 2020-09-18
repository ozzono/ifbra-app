<template>
  <div>
    <v-row>
      <v-col>
        <LighterTextField
          title="Formulário 4"
          subtitle="Aplicação do Modelo Linguístico Fuzzy"
          comment=""
        />
      </v-col>
    </v-row>
    <v-row v-for="(row, i) in printFuzzy" :key="i">
      <v-col class="d-flex align-center justify-center">{{ row.Desc }}</v-col>
      <v-col class="d-flex align-center justify-center">
        <v-switch :label="row.Obs" readonly v-model="row.severe" />
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-switch
          label="Não dispõe de auxílio de terceiros sempre que necessário."
          readonly
          v-model="row.needAid"
        />
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <FuzzySwitch
          :innerLabel="
            `Houve pontuação 25 ou 50 em alguma atividade dos domínios ${row.Dominios.join(
              ' ou '
            )}; OU Houve pontuação 75 em todas atividade dos domínios ${row.Dominios.join(
              ' ou '
            )}`
          "
          :dominios="row.Dominios"
          :read-only="true"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["printFuzzy", "fuzzy"]),
  components: {
    LighterTextField: () => import("@/components/LighterTextField"),
    FuzzySwitch: () => import("@/components/FuzzySwitch")
  }
};
</script>

<style></style>
