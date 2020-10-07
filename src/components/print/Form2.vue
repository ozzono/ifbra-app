<template>
  <div>
    <v-row>
      <v-col>
        <LighterTextField
          text=""
          title="Formulário 2"
          subtitle="Funções corporais acometidas"
          comment="a ser preenchido pelo médico perito"
        />
      </v-col>
    </v-row>
    <v-row />
    <EmptyFormAlert text="" :show="Object.keys(bodyFunctions).length == 0" />
    <div v-for="(bodyFunction, i) in bodyFunctions" :key="i">
      <v-row>
        <v-col>
          <LighterTextField
            text=""
            :title="`${i + 1}. ${bodyFunction.Type}`"
            subtitle=""
            comment=""
          />
        </v-col>
      </v-row>
      <v-row v-for="(subFunction, j) in bodyFunction.SubFunction" :key="j">
        <v-card flat tile class="d-flex justify-start text-left">
          <v-card
            flat
            tile
            :class="
              `d-flex text-center align-center d-none left-pad ${
                theme.dark ? '' : theme.color
              }`
            "
          >
            <p v-if="subFunction.checked">
              <v-icon x-large>mdi-checkbox-marked</v-icon>
            </p>
            <p v-else>
              <v-icon x-large>mdi-checkbox-blank-outline</v-icon>
            </p>
          </v-card>
          <v-card flat tile>
            <LighterTextField
              text=""
              :title="`${i + 1}.${j + 1} ${subFunction.Type}:`"
              :subtitle="`${subFunction.Detail}`"
              comment=""
            />
          </v-card>
        </v-card>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: mapGetters(["bodyFunctions", "theme"]),
  components: {
    LighterTextField: () => import("@/components/LighterTextField"),
    EmptyFormAlert: () => import("@/components/print/EmptyFormAlert")
  }
};
</script>

<style scoped>
.left-pad {
  padding-left: 3rem;
}
</style>
