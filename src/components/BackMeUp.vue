<template>
  <v-container>
    <v-card class="mx-auto" outlined>
      <v-card-title class="text-center justify-center">
        <h1 class="font-weight-bold display-3">
          Contribua
        </h1>
      </v-card-title>
      <v-card-text>
        <h4>
          Essa página é desenvolvida de forma autônoma e independe, sem exibição
          de anúncios ou coleta de dados e é mantida exclusivamente a partir das
          doações feitas pelos seus usuários.
        </h4>
        Para doar, escolha uma das opções abaixo.

        <v-list-item>
          <v-list-item-avatar tile size="150">
            <img src="../assets/images/apoiase.svg" alt="Apoia-se" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              Contribua pelo <a href="https://apoia.se/ifbra">Apoia-se</a>
            </v-list-item-title>
            <v-list-item-subtitle>
              Compre-me um café de R$ 5,00 ou um milkshake de R$ 15,00 e ajude a
              manter essa página.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-avatar tile size="150">
            <img src="../assets/images/pix.svg" alt="Apoia-se" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              Contribua com um PIX de qualquer valor.
            </v-list-item-title>
            <v-list-item-subtitle>
              Para contribuir com PIX, utilize o email <i>ifbra@outlook.com</i>.
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="sass" scoped></style>
