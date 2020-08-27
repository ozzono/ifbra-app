<template>
  <v-container fluid>
    <v-switch :v-model="innerModel" :label="innerLabel" />
  </v-container>
</template>

<script>
export default {
  name: "RowSwitch",
  props: {
    makeActive: Boolean,
    innerLabel: String,
    innerModel: String
  }
};
</script>
