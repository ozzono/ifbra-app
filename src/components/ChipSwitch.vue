<template>
  <v-card
    flat
    :class="
      `${theme.dark ? 'default-grey' : theme.color}
      ${this.width >= 960 ? 'big-width' : 'small-width'}`
    "
  >
    <v-card-text>
      <v-btn-toggle dense rounded mandatory v-model="toggle_exclusive">
        <v-btn @click="status()" :color="!innerValue ? 'primary' : ''">
          exibir
        </v-btn>
        <v-btn @click="status()" :color="innerValue ? 'primary' : ''">
          ocultar
        </v-btn>
      </v-btn-toggle>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  // TODO: refactor this shitty Switch
  // Build it from the ground
  data: () => ({
    toggle_exclusive: true,
    innerValue: false,
    width: 0
  }),
  props: ["values"],
  methods: {
    status() {
      this.innerValue = !this.innerValue;
      this.$emit("toggle", this.innerValue);
    },
    setWidth() {
      this.width = window.innerWidth;
    }
  },
  computed: {
    ...mapGetters(["theme"])
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
</style>
