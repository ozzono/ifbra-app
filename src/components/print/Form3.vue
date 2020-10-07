<template>
  <div>
    <v-row>
      <v-col>
        <LighterTextField
          text=""
          title="Formulário 3"
          subtitle="Aplicação do Instrumento"
          comment="Matriz"
        />
      </v-col>
    </v-row>
    <EmptyFormAlert text="" :show="Object.keys(allScores).length == 0"/>
    <div v-for="(dominio, i) in allScores" :key="i">
      <v-row>
        <v-col>
          <LighterTextField
            text=""
            :title="`${i + 1}. ${dominio.Desc}`"
            subtitle=""
            comment=""
          />
        </v-col>
      </v-row>
      <v-row v-for="(subdominio, j) in dominio.SubDominios" :key="j">
        <v-divider v-if="j > 0" />
        <v-col cols="6">
          <p class="h5 font-weight-regular">
            {{ `${i + 1}.${j + 1} ${subdominio.Desc}` }}
          </p>
          <p class="h6 font-weight-regular">{{ subdominio.Detalhe }}</p>
        </v-col>
        <v-col cols="2" class="text-center d-flex justify-center align-center">
          Médica: {{ subdominio.medical }}
        </v-col>
        <v-col cols="2" class="text-center d-flex justify-center align-center">
          Social: {{ subdominio.social }}
        </v-col>
        <v-col cols="2" class="text-center d-flex justify-center align-center">
          <div>
            {{
              subdominio.barriers.length > 0
                ? `Barreira${
                    subdominio.barriers.length > 1 ? "s" : ""
                  }: ${subdominio.barriers.join(", ")}`
                : "Nenhuma barreira assinalada."
            }}
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["allScores"]),
  components: {
    LighterTextField: () => import("@/components/LighterTextField"),
    EmptyFormAlert: () => import("@/components/print/EmptyFormAlert")
  }
};
</script>

<style></style>
