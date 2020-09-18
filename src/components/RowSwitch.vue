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
    innerValue: false
  }),
  name: "RowSwitch",
  props: {
    makeActive: Boolean,
    innerLabel: String,
    innerModel: Boolean
  },
  methods: {
    changeThis() {
      this.innerValue = !this.innerValue;
      this.$emit("switch-change", this.innerValue);
    }
  }
};
</script>
