<template>
  <v-card flat :class="`${!theme.dark ? theme.color : ''}`">
    <v-row>
      <v-col
        cols="2"
        class="d-flex justify-center align-center"
        :class="{ 'vertical vertical-pad': width < 960 }"
      >
        <span>
          Pontuação
        </span>
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <span>
          Critério
        </span>
      </v-col>
    </v-row>
    <div v-for="(pont, i) in INSSDesc" :key="i">
      <v-divider />
      <v-row>
        <v-col
          cols="2"
          class="align-center justify-center d-flex font-weight-bold"
        >
          {{ pont.Item }}
        </v-col>
        <v-col>
          {{ pont.Desc }}
          <v-row>
            <v-col class="align-center justify-center d-flex" md="2" cols="1">
              <div :class="{ 'vertical align-left': width < 960 }">
                Observações
              </div>
            </v-col>
            <v-col>
              <v-list :class="`${!theme.dark ? theme.color : ''}`">
                <div v-for="(extra, j) in pont.Extras" :key="j">
                  <v-divider v-if="j > 0" />
                  <v-list-item>
                    {{ extra.Detalhe }}
                  </v-list-item>
                  <v-list-group v-if="extra.Exemplos.length > 0">
                    <template v-slot:activator>
                      <v-list-item-title>
                        Exemplo<span v-if="extra.Exemplos.length > 1">s</span>:
                      </v-list-item-title>
                    </template>
                    <v-list-item
                      v-for="(exemplo, k) in extra.Exemplos"
                      :key="k"
                    >
                      - {{ exemplo }}
                    </v-list-item>
                  </v-list-group>
                </div>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import INSSDesc from "@/assets/json/inss.json";
export default {
  name: "INSS",
  data: () => ({
    INSSDesc: Object.values(INSSDesc),
    width: false
  }),
  created() {
    this.setWidth();
  },
  methods: {
    setWidth() {
      this.width = window.innerWidth;
    }
  },
  mounted() {
    this.$eventHub.$on("resize", this.setWidth);
  },
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
