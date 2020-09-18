<template>
  <div>
    <v-row>
      <v-col>
        <LighterTextField
          title="Formulário 2"
          subtitle="Funções corporais acometidas"
          comment="a ser preenchido pelo médico perito"
        />
      </v-col>
    </v-row>
    <div v-for="(bodyFunction, i) in bodyFunctions" :key="i">
      <v-row v-for="(subFunction, j) in bodyFunction.SubFunction" :key="j">
        <v-col cols="2" class="d-flex align-center justify-center text-center">
          <v-switch readonly v-model="subFunction.checked" />
        </v-col>
        <v-col>
          <LighterTextField
            :title="`${i + 1}.${j + 1} ${subFunction.Type}:`"
            :subtitle="`${subFunction.Detail}`"
            comment=""
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["bodyFunctions"]),
  components: {
    LighterTextField: () => import("@/components/LighterTextField")
  }
};
</script>

<style></style>
