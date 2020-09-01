<template>
  <v-row class="flex">
    <v-col cols="10">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-subtitle>
        {{ subtitle }}
        <i v-if="comment.length > 0">({{ comment }})</i>
      </v-card-subtitle>
    </v-col>
    <v-col cols="1">
      <ChipSwitch @toggle="$emit('toggle', $event)" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FormHeader",
  props: {
    title: String,
    subtitle: String,
    comment: String
  },
  components: {
    ChipSwitch: () => import("@/components/ChipSwitch")
  }
};
</script>

<style></style>
