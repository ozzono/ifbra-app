<template>
  <div>
    <v-row>
      <v-col>
        <LighterTextField
          title="Formulário 3"
          subtitle="Aplicação do Instrumento"
          comment="Matriz"
        />
      </v-col>
    </v-row>
    <div v-for="(dominio, i) in allScores" :key="i">
      <v-row>
        <v-col>
          <LighterTextField
            :title="`${i + 1}. ${dominio.Desc}`"
            subtitle=""
            comment=""
          />
        </v-col>
      </v-row>
      <v-row v-for="(subdominio, j) in dominio.SubDominios" :key="j">
        <v-col cols="6">
          <LighterTextField
            :title="`${i + 1}.${j + 1} ${subdominio.Desc}`"
            :subtitle="subdominio.Detalhe"
            comment=""
          />
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
    LighterTextField: () => import("@/components/LighterTextField")
  }
};
</script>

<style></style>
