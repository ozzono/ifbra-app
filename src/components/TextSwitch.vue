<template>
  <div>
    <v-card
      flat
      outlined
      tile
      :class="
        `d-flex margin text-uppercase
        ${
          this.width >= 960
            ? 'big-width justify-center'
            : 'small-width flex-column'
        }`
      "
      max-width="10.751rem"
      @click="switchVal()"
    >
      <v-card
        tile
        :class="`btn ${!model ? this.activeColor : ''}`"
        flat
        :v-model="model"
        >{{ value[0] }}</v-card
      >
      <v-card
        tile
        :class="`btn ${model ? this.activeColor : ''}`"
        flat
        :v-model="!model"
        >{{ value[1] }}</v-card
      >
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    model: false,
    width: 0
  }),
  props: ["value", "active-color"],
  methods: {
    switchVal() {
      this.model = !this.model;
      this.$emit("toggle", this.model);
    },
    setWidth() {
      this.width = window.innerWidth;
    }
  },
  mounted() {
    this.$eventHub.$on("resize", this.setWidth);
  },
  created() {
    this.setWidth();
  }
};
</script>

<style scoped>
.big-width {
  transform: scale(0.9, 0.9);
}
.small-width {
  transform: scale(0.6, 0.6);
}
.wrap {
  flex-direction: column;
}
.margin {
  /* top right bottom left */
  margin: 0 1.93rem 0 1.93rem;
}
</style>
