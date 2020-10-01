<template>
  <div :class="`${!theme.dark ? theme.color : ''}`">
    <v-card>
      <v-card flat :class="`${!theme.dark ? theme.color : ''}`">
        <LighterTextField
          text=""
          title="Detalhamento de pontuação do INSS"
          comment=""
          subtitle=""
        />
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
                <v-col
                  class="align-center justify-center d-flex"
                  md="2"
                  cols="1"
                >
                  <div :class="{ 'vertical align-left': width < 960 }">
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
    </v-card>
    <v-card>
      <v-card flat :class="`${!theme.dark ? theme.color : ''}`">
        <LighterTextField
          text=""
          title="Descrição das Barreiras"
          subtitle=""
          comment=""
          colorClass="default-grey"
        />
        <v-row v-for="(item, i) in BarreirasDesc" :key="i">
          <v-col
            class="align-center text-center justify-center d-flex"
            cols="2"
          >
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
    </v-card>
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
    LighterTextField: () => import("@/components/LighterTextField")
  }
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
