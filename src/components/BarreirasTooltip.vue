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
        <v-row dense v-for="(barreira,i) in barreiras" :key="i">
          <v-col>{{barreira.Nome}}</v-col>
          <v-col>{{barreira.Desc}}</v-col>
        </v-row>
        <span>Para descrição completa das barreiras consulte o manual</span>
      </span>
    </v-tooltip>
  </div>
</template>

<script>
import Barreiras from "@/assets/json/DescBarreiras.json"
export default {
  name: "BottomTooltip",
  props: {
    content: String,
    tooltip: String
  },
  data: () => ({
    barreiras: Object.values(Barreiras), //.split(","),
    teste:[{1:"1",2:"2"},{1:"1",2:"2"}],
  }),
}
</script>

<style>

</style>