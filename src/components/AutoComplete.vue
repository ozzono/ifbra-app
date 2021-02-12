<template>
  <div>
    <v-row align="center">
      <v-col cols="12">
        <v-autocomplete
          :items="allCID"
          :label="innerLabel"
          :multiple="allowMultiple"
          hide-selected
          :hint="innerHint"
          :persistent-hint="innerHint.length > 0"
          :clearable="allowMultiple"
          :messages="messages"
          v-model="text"
          chips
          dense
          @change="$emit('inner-change', text)"
          ref="field"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AutoComplete",
  data: () => ({
    value: null,
    text: ""
  }),
  props: ["innerLabel", "allowMultiple", "innerHint", "messages", "require"],
  methods: {
    clear() {
      this.text = "";
    },
    focus() {
      this.$refs.field.focus();
    }
  },
  computed: {
    ...mapGetters(["allCID"])
  }
};
</script>
