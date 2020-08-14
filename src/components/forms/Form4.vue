<template>
  <div class="form">
    <v-flex>
      <v-container class="grey lighten-5">
        <FormHeader
          title="Formulário 4"
          subtitle="Aplicação do Modelo Linguístico Fuzzy"
          comment=""
        />
        <v-row class="flex">
          <v-col :cols="12">
            Domínios e Atividades
          </v-col>
        </v-row>
        <div v-for="(deficiecia, i) in Deficiencias" :key="i">
          <v-divider v-if="i > 0" class="hidden-md-and-up" :inset="true" />
          <v-row class="align-center d-flex">
            <v-col class="text-center" md="2" cols="12">
              {{ deficiecia.Desc }}
            </v-col>
            <v-col cols="10">
              <v-container>
                <v-row class="align-center d-flex" flat tile>
                  <v-col class="text-center" cols="12" md="4">
                    <RowSwitch :innerLabel="deficiecia.Obs" />
                  </v-col>
                  <v-col cols="12" md="4">
                    <RowSwitch
                      :innerLabel="
                        `Houve pontuação 25 ou 50 em alguma atividade dos domínios ${deficiecia.Dominios}`
                      "
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <RowSwitch
                      :innerLabel="
                        `Houve pontuação 75 em todas as atividades dos domínios ${deficiecia.Dominios}`
                      "
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-flex>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Deficiencias from "@/assets/json/form4.json";
export default {
  data: () => ({
    Deficiencias: Object.values(Deficiencias)
  }),
  components: {
    RowSwitch: () => import("@/components/RowSwitch"),
    FormHeader: () => import("@/components/forms/FormHeader")
  }
};
</script>
