<template>
  <v-select
    dense
    :label="innerLabel"
    v-model="selected"
    :items="innerItems"
    :multiple="allowMultiple"
    :clearable="allowMultiple"
    :outlined="makeOutlined"
    @change="$emit('update:selected', selected)"
  >
    <template v-if="allowMultiple" v-slot:prepend-item>
      <v-list-item ripple @click="toggle">
        <v-list-item-action>
          <v-icon :color="selected.length > 0 ? 'indigo darken-4' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Todos</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "CheckList",
  props: [
    "selected",
    "innerItems",
    "innerLabel",
    "allowMultiple",
    "makeClearable",
    "makeOutlined"
  ],
  computed: {
    allItems() {
      return this.selected.length === this.innerItems.length;
    },
    someItems() {
      return this.selected.length > 0 && !this.allItems;
    },
    icon() {
      if (this.allItems) return "mdi-close-box";
      if (this.someItems) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },

  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.allItems) {
          this.selected = [];
        } else {
          this.selected = this.innerItems.slice();
        }
      });
    },
    clear() {
      this.selected = [];
    }
  }
};
</script>
