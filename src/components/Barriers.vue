<template>
  <v-card flat :class="`${theme.dark ? '' : theme.color}`">
    <v-row v-for="(item, i) in BarrierDesc" :key="i">
      <v-col class="align-center text-center justify-center d-flex" cols="2">
        <span class="wrap hidden-md-and-up"> {{ item.Item }} </span>
        <span class="hidden-sm-and-down"> {{ item.Item }} </span>
      </v-col>
      <v-col class="align-center text-center justify-center d-flex" cols="3">
        <span class="vertical hidden-md-and-up">{{ item.Desc }}</span>
        <span class="hidden-sm-and-down">{{ item.Desc }}</span>
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
