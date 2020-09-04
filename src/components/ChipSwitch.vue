<template>
  <v-card
    flat
    class="rescale"
    :class="`${theme.dark ? 'default-grey' : theme.color}`"
  >
    <v-card-text>
      <v-btn-toggle dense rounded mandatory v-model="toggle_exclusive">
        <v-btn @click="status()" :color="!innerValue ? 'primary' : ''">
          <v-icon>exibir</v-icon>
        </v-btn>
        <v-btn @click="status()" :color="innerValue ? 'primary' : ''">
          <v-icon>ocultar</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    toggle_exclusive: true,
    innerValue: false
  }),
  props: ["values"],
  methods: {
    status() {
      this.innerValue = !this.innerValue;
      this.$emit("toggle", this.innerValue);
    }
  },
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>

<style scoped>
.rescale {
  transform: scale(0.5, 0.5);
}
</style>
