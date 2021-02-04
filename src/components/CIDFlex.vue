<template>
  <v-container :class="`${!theme.dark ? theme.color : ''}`">
    <v-card
      tile
      flat
      class=""
      width="100%"
      height="5em"
      :class="
        `d-inline-flex align-center justify-space-between form
        ${!theme.dark ? theme.color : ''}`
      "
    >
      <v-card
        flat
        tile
        :class="`${!theme.dark ? theme.color : ''} d-flex text`"
      >
        {{ text }}
      </v-card>
      <v-card
        flat
        tile
        v-if="!hideButton"
        :class="
          `${!theme.dark ? theme.color : ''} d-flex justify-right minux-btn`
        "
        width="2em"
      >
        <v-btn @click="$emit('inner-click')" plain width="1em">
          <v-icon>mdi-minus-box</v-icon>
        </v-btn>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["text","hideButton"],
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>
<style scoped>
.minux-btn {
  padding-right: 4em;
}
.text {
  padding-left: 1em;
}
</style>
