<template>
  <div class="text-center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="black"
          dark
          v-bind="attrs"
          v-on="on"
        >mdi-comment-question</v-icon>
      </template>
      <span>
        <v-row>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
          <v-col></v-col>
        </v-row>
      </span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "BottomTooltip",
  props: {
    content: String,
    tooltip: String
  },
}
</script>

<style>
 tooltip-ul{
   list-style-type:none;
 }
</style>