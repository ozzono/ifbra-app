<template>
  <v-row class="flex">
    <v-col cols="10">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle
      >
        {{ subtitle }}
        <i v-if="comment.length > 0">({{ comment }})</i>
      </v-card-subtitle>
    </v-col>
    <v-col cols="1">
      <RowSwitch></RowSwitch>
    </v-col>
  </v-row>
</template>

<script>
import RowSwitch from "@/components/RowSwitch";
export default {
  name: "FormHeader",
  props: {
    title: String,
    subtitle: String,
    comment: String
  },
  components: {
    RowSwitch: RowSwitch,
  }
};
</script>

<style></style>
