<template>
  <div>
    <v-row align="center">
      <v-col cols="12">
        <v-autocomplete
          :items="innerItems"
          :label="innerLabel"
          :multiple="allowMultiple"
          dense
          hide-selected
          :hint="innerHint"
          :persistent-hint="innerHint.length > 0"
          :clearable="allowMultiple"
          :messages="messages"
        />
        <!-- outlined -->
        <!-- dense -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AutoComplete",
  data: () => ({
    value: null
  }),
  props: ["innerItems", "innerLabel", "allowMultiple", "innerHint", "messages"]
  // props: {
  //   innerItems: Object,
  //   innerLabel: String,
  //   allowMultiple: Boolean
  // }
};
</script>
