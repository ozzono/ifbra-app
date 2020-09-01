<template>
  <v-card flat>
    <v-card-text>
      <v-row align="center" class="default" justify="center">
        <v-btn-toggle dense rounded mandatory>
          <v-btn @click="status()" :color="!innerValue ? 'primary' : ''">
            <v-icon>exibir</v-icon>
          </v-btn>
          <v-btn @click="status()" :color="innerValue ? 'primary' : ''">
            <v-icon>ocultar</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    innerValue: false
  }),
  methods: {
    status() {
      this.innerValue = !this.innerValue;
      this.$emit("toggle", this.innerValue);
    }
  }
};
</script>
