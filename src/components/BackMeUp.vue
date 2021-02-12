<template>
  <v-container>
    <v-card class="mx-auto" tile flat>
      <v-card-title class="text-center justify-center">
        <h1 class="font-weight-bold display-3">
          Contribua
        </h1>
      </v-card-title>
      <v-card-text>
        <h3>
          <p>
            Essa página é desenvolvida de forma autônoma e independe, sem
            exibição de anúncios ou coleta de dados e é mantida exclusivamente a
            partir das doações feitas pelos seus usuários.
          </p>
          <p>Para doar, escolha uma das opções abaixo.</p>
        </h3>
        <v-card flat tile @click="apoia()" class="padding pointer">
          <v-row class="d-flex flex-row align-center">
            <v-col cols="12" md="5">
              <v-img
                max-width="25em"
                max-height="10em"
                src="../assets/images/apoiase.svg"
                alt="Apoia-se"
              />
            </v-col>
            <v-col cols="12" md="7">
              <v-card tile flat>
                <v-card-title>
                  Contribua pelo Apoia-se
                </v-card-title>
                <v-card-text>
                  Compre-me um café de R$ 5,00 ou um milkshake de R$ 15,00 e
                  ajude a manter essa página.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
        <v-card flat tile @click="clipboard()" class="padding pointer">
          <v-row class="d-flex flex-row align-center">
            <v-col cols="12" md="5">
              <v-img
                max-width="25em"
                max-height="10em"
                src="../assets/images/pix.svg"
                alt="Pix"
              />
            </v-col>
            <v-col cols="12" md="7">
              <v-card tile flat>
                <v-card-title>
                  Contribua com um PIX de qualquer valor.
                </v-card-title>
                <v-card-text>
                  Para contribuir com PIX, utilize a chave
                  <i>ifbra@outlook.com</i>. <br />Clique para copiar a chave.
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
export default {
  methods: {
    apoia() {
      this.$eventHub.$emit("force-blur");
      window.open("https://apoia.se/ifbra");
    },
    clipboard() {
      navigator.clipboard.writeText("ifbra@outlook.com");
      this.$eventHub.$emit("force-blur");
    }
  }
};
</script>

<style scoped>
.padding {
  padding: 1em;
}
.pointer {
  cursor: pointer;
}
</style>
