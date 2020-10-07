<template>
  <v-container fluid>
    <v-switch v-model="val" />
  </v-container>
</template>

<script>
/* eslint-disable no-console */
export default {
  data: () => ({
    val: false
  }),
  name: "RowSwitch",
  props: {
    makeActive: Boolean,
    innerLabel: String,
    innerModel: Boolean
  },
  methods: {
    innerChange() {
      this.val = !this.val;
    }
  }
};
</script>
