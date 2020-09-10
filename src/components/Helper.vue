<template>
  <div :class="`${!theme.dark ? theme.color : ''}`">
    <h3 class="text-center">Legenda</h3>
    <v-container>
      <v-card :class="`${!theme.dark ? theme.color : ''}`">
        <BaseTextField
          title="Detalhamento de pontuação do INSS"
          comment=""
          subtitle=""
        />
        <v-row>
          <v-col cols="3" md="2" class="text-center">
            <span>
              Pontuação
            </span>
          </v-col>
          <v-col class="text-center">
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
              md="2"
              class="align-center justify-center d-flex font-weight-bold"
            >
              {{ pont.Item }}
            </v-col>
            <v-col>
              {{ pont.Desc }}
              <v-row>
                <v-col
                  class="align-center justify-center d-flex"
                  md="2"
                  cols="1"
                >
                  <div :class="`${width >= 960 ? '' : 'align-left vertical'}`">
                    Observações
                  </div>
                </v-col>
                <v-divider vertical />
                <v-col>
                  <v-list :class="`${!theme.dark ? theme.color : ''}`">
                    <div v-for="(extra, j) in pont.Extras" :key="j">
                      <v-divider v-if="j > 0" />
                      <v-list-item>
                        {{ extra.Detalhe }}
                      </v-list-item>
                      <v-list-item v-if="extra.Exemplos.length > 0">
                        <v-list-item-content>
                          <v-list-item-subtitle>
                            Exemplo<span v-if="extra.Exemplos.length > 1"
                              >s</span
                            >:</v-list-item-subtitle
                          >
                          <v-list-item-subtitle
                            v-for="(exemplo, k) in extra.Exemplos"
                            :key="k"
                          >
                            - {{ exemplo }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </div>
                  </v-list>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-row>
          <v-col class="header font-weight-medium text-center">
            Descrição das Barreiras
          </v-col>
        </v-row>
        <v-row v-for="(item, i) in BarreirasDesc" :key="i">
          <v-col class="align-center justify-center d-flex" cols="1" md="2">
            <span :class="`${width >= 960 ? '' : 'wrap'}`">
              {{ item.Item }}
            </span>
          </v-col>
          <v-col
            class="align-center justify-center d-flex"
            :class="`${width >= 960 ? 'big-padding' : 'vertical'}`"
            cols="3"
          >
            {{ item.Desc }}
          </v-col>
          <v-col class="align-center justify-center d-flex">
            {{ item.Extras[0] }}
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters } from "vuex";
import INSSDesc from "@/assets/json/inss.json";
import BarreirasDesc from "@/assets/json/barreiras.json";
export default {
  name: "Helper",
  data: () => ({
    INSSDesc: Object.values(INSSDesc),
    BarreirasDesc: Object.values(BarreirasDesc),
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
    window.addEventListener("resize", this.setWidth);
  },
  computed: mapGetters(["theme"]),
  components: {
    BaseTextField: () => import("@/components/BaseTextField")
  }
};
</script>

<style scoped>
.header {
  padding-left: 1rem;
}
.desc {
  min-width: 3rem;
}
h3 {
  padding-top: 1rem;
}
.big-padding {
  padding-left: 5.5rem;
}
.small-padding {
  padding-left: 2rem;
}
.vertical {
  transform: rotate(270deg);
}
.wrap {
  width: 1ch;
  word-break: break-all;
}
</style>
