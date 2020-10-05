<template>
  <v-card flat :class="`${theme.dark ? '' : theme.color}`">
    <v-row v-for="(item, i) in BarrierDesc" :key="i">
      <v-col class="align-center text-center justify-center d-flex" cols="2">
        <span :class="{ wrap: width < 960 }">
          {{ item.Item }}
        </span>
      </v-col>
      <v-col
        class="align-center text-center justify-center d-flex"
        :class="{ vertical: width < 960 }"
        cols="3"
      >
        {{ item.Desc }}
      </v-col>
      <v-col class="align-center d-flex">
        {{ item.Extras[0] }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import barrier from "@/assets/json/barreiras.json";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    BarrierDesc: Object.values(barrier)
  }),
  computed: mapGetters(["theme"])
};
</script>

<style scoped>
h3 {
  padding-top: 1rem;
}
.vertical {
  transform: rotate(270deg);
}
.wrap {
  width: 1ch;
  word-break: break-all;
}
.vertical-pad {
  font-size: 80%;
  margin-top: 1rem;
}
</style>
