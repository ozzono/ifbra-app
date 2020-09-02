<template>
  <v-container fluid>
    <v-switch
      @change="changeThis()"
      :v-model="innerModel"
      :label="innerLabel"
    />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    switchValue: false
  }),
  name: "RowSwitch",
  props: {
    makeActive: Boolean,
    innerLabel: String,
    innerModel: Boolean
  },
  methods: {
    changeThis() {
      this.switchValue = !this.switchValue;
      this.$emit("switch-change", this.switchValue);
    }
  }
};
</script>
