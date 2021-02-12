<template>
  <div :class="`${theme.dark ? '' : theme.color}`">
    <v-container :class="`${theme.dark ? '' : theme.color}`">
      <v-card tile flat :class="`${theme.dark ? '' : theme.color}`">
        <v-card-title class="text-center justify-center">
          <h1 class="font-weight-bold display-3">
            Contribua
          </h1>
        </v-card-title>
        <v-card-text>
          <h3>
            <v-row>
              <v-col md="4" cols="12" class="d-flex justify-center">
                <v-card
                  class="text-center d-flex align-center justify-center"
                  width="100%"
                  color="warning"
                  height="3em"
                  hover
                  @click="
                    open(
                      'https://github.com/ozzono/ifbra-app/issues/new?assignees=&labels=bug&template=bug_report.md&title=%5BDATA%5D%3A+%5BERRO%5D'
                    )
                  "
                >
                  Sugerir uma modificação
                </v-card>
              </v-col>
              <v-col md="4" cols="12" class="d-flex justify-center">
                <v-card
                  hover
                  height="3em"
                  class="d-flex justify-center align-center"
                  color="error"
                  width="100%"
                  @click="
                    open(
                      'https://github.com/ozzono/ifbra-app/issues/new?assignees=&labels=feature&template=feature_request.md&title=%5BDATA%5D%3A+%5BMELHORIA%5D'
                    )
                  "
                >
                  Reportar um erro
                </v-card>
              </v-col>
              <v-col md="4" cols="12" class="d-flex justify-center">
                <v-card
                  height="3em"
                  class="d-flex justify-center align-center"
                  color="primary"
                  width="100%"
                  href="mailto:ifbra@outlook.com"
                >
                  Enviar um email
                </v-card>
              </v-col>
            </v-row>
            <v-divider class="divider" />
            <p>
              Essa página é desenvolvida de forma autônoma e independe, sem
              exibição de anúncios ou coleta de dados e é mantida exclusivamente
              a partir das doações feitas pelos seus usuários.
            </p>
          </h3>
          <h3 class="text-center">
            <p>Para doar, escolha uma das opções abaixo.</p>
          </h3>
          <v-card
            flat
            tile
            hover
            @click="apoia()"
            :class="`padding pointer ${theme.dark ? '' : theme.color}`"
          >
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
                <v-card tile flat :class="`${theme.dark ? '' : theme.color}`">
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
          <v-card
            flat
            hover
            tile
            @click="clipboard()"
            :class="`padding pointer ${theme.dark ? '' : theme.color}`"
          >
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
                <v-card tile flat :class="`${theme.dark ? '' : theme.color}`">
                  <v-card-title>
                    Contribua com um PIX de qualquer valor
                  </v-card-title>
                  <v-card-text>
                    Para contribuir com PIX, utilize a chave
                    <i>ifbra@outlook.com</i>.
                    <br />
                    Clique para copiar a chave.
                  </v-card-text>
                  <v-dialog v-model="dialog" max-width="20em">
                    <v-card tile flat color="grey" class="text-center">
                      Chave copiada com sucesso.
                    </v-card>
                  </v-dialog>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({ dialog: false }),
  methods: {
    apoia() {
      this.$eventHub.$emit("force-blur");
      window.open("https://apoia.se/ifbra");
    },
    clipboard() {
      this.$eventHub.$emit("force-blur");
      navigator.clipboard.writeText("ifbra@outlook.com");
      this.dialog = true;
    },
    open(link) {
      window.open(link);
    },
    mail() {
      location.href = "mailto:ifbra@outlook.com";
    }
  },
  watch: {
    dialog() {
      if (this.dialog) {
        setTimeout(() => {
          this.dialog = false;
        }, 2000);
      }
    }
  },
  computed: {
    ...mapGetters(["theme"])
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
.divider {
  margin-bottom: 1em;
  margin-top: 1em;
}
</style>
