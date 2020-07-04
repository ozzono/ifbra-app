<template>
  <div>
    <v-container fluid>
      <v-select
        v-model="selectedBarreiras"
        :items="barreiras"
        multiple
        outlined
        flat
        class="align-start"
      >
        <template v-slot:prepend-item>
          <v-list-item ripple @click="toggle">
            <v-list-item-action>
              <v-icon
                :color="selectedBarreiras.length > 0 ? 'indigo darken-4' : ''"
                >{{ icon }}</v-icon
              >
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Todas</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </template>
      </v-select>
    </v-container>

  </div>
</template>

<script>
import Barreiras from "@/assets/json/barreiras.json";
export default {
  data: () => ({
    barreiras: Object.values(Barreiras), //.split(","),
    selectedBarreiras: []
  }),
  computed: {
    todasBarreiras() {
      return this.selectedBarreiras.length === this.barreiras.length;
    },
    algumasBarreiras() {
      return this.selectedBarreiras.length > 0 && !this.todasBarreiras;
    },
    icon() {
      if (this.todasBarreiras) return "mdi-close-box";
      if (this.algumasBarreiras) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    }
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.todasBarreiras) {
          this.selectedBarreiras = [];
        } else {
          this.selectedBarreiras = this.barreiras.slice();
        }
      });
    }
  }
};
</script>
