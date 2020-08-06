<template>
  <v-tooltip bottom open-delay="200">
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">{{ desc }}</span>
    </template>
    <span>
      <v-row v-for="(contentRow, i) in content" :key="i">
        <v-col cols="1" align="center">
          {{ contentRow.MainCol }}
        </v-col>
        <v-col cols="11">
          {{ contentRow.DescCol }}
        </v-col>
      </v-row>
      <v-row v-if="comment.length > 0">
        <v-col align="center">
          {{ comment }}
        </v-col>
      </v-row>
    </span>
  </v-tooltip>
</template>

<script>
export default {
  name: "Tooltip",
  props: ["content", "desc", "comment"]
  // props: {
  //   content: Object,
  //   desc: String,
  //   comment: String
  // }
};
</script>

<style></style>
