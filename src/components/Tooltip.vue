<template>
  <v-tooltip :v-model="true" bottom open-delay="200" max-width="40%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon :color="`${theme.dark ? '' : 'blue lighten-1'}`">
          {{ mdiIcon }}
        </v-icon>
      </v-btn>
    </template>
    <span>
      <div v-if="arrayContent.length > 0">
        <v-row v-for="(row, i) in arrayContent" :key="i">
          <v-col cols="2" class="align-center justify-center d-flex">{{
            row.Item
          }}</v-col>
          <v-col cols="10">{{ row.Desc }}</v-col>
        </v-row>
      </div>
      <v-row>
        <v-col class="text-center">
          {{ content }}
        </v-col>
      </v-row>
    </span>
  </v-tooltip>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Tooltip",
  props: ["content", "mdi-icon", "arrayContent"],
  computed: {
    ...mapGetters(["theme"])
  }
};
</script>
