<template>
  <div>
    <v-btn
      @click="setTheme()"
      :class="{ 'white black--text': this.dark }"
      fab
      small
      :dark="!this.dark"
    >
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data: () => ({
    dark: false
  }),
  methods: {
    setTheme() {
      this.dark = !this.dark;
      this.$eventHub.$emit("theme");
      let el = this.$el.querySelector(":focus");
      if (el) el.blur();
    }
  }
};
</script>
