<template>
  <div>
    <LigtherTextField title="Classificação" text="" subtitle="" comment="" />
    <v-row v-for="(range, i) in ranges" :key="i">
      <v-col cols="4">Deficiência {{ range.label }}</v-col>
      <v-col cols="8">
        Quando a pontuação é menor ou igual a {{ range.max - 1 }}
        <span v-if="range.min > 0">e menor ou igual a {{ range.min }}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    ranges: [
      { label: "Grave", min: 0, max: 5740 },
      { label: "Moderada", min: 5740, max: 6355 },
      { label: "Leve", min: 6355, max: 7585 },
      {
        label: "Insuficiente para concessão de benefício",
        min: 7585,
        max: 8200
      }
    ]
  }),
  components: {
    LigtherTextField: () => import("@/components/LighterTextField")
  }
};
</script>

<style lang="scss" scoped></style>
