<template>
  <div>
    <v-btn
      @click="setTheme()"
      :class="`hidden-sm-and-down ${theme.dark ? 'white black--text' : ''}`"
      tile
      :dark="!this.theme.dark"
    >
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
    <v-btn
      @click="setTheme()"
      :class="`hidden-md-and-up ${theme.dark ? 'white black--text' : ''}`"
      tile
      small
      :dark="!this.theme.dark"
    >
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    setTheme() {
      this.$eventHub.$emit("force-blur");
      this.theme.dark = !this.theme.dark;
      this.$eventHub.$emit("theme");
    }
  },
  computed: {
    ...mapGetters(["theme"])
  },
  mounted() {
    if (this.$route.query.dark) {
      this.setTheme();
    }
  }
};
</script>
