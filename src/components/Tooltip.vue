<template>
  <v-tooltip :v-model="true" bottom open-delay="200">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="grey lighten-1">
          {{ mdiIcon }}
        </v-icon>
      </v-btn>
    </template>
    <span>{{ content }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "Tooltip",
  props: ["content", "mdi-icon"]
};
</script>

<style></style>
