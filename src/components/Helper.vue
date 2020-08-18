<template>
  <div>
    <h3 class="text-center">Legenda</h3>
    <v-container>
      <v-card>
        <v-list header two-line flat>
          <v-header class="header font-weight-medium">
            Detalhamento de pontuação do INSS
          </v-header>
          <v-list-item-group v-for="(item, i) in INSSDesc" :key="i">
            <v-list-item>
              <v-list-item-action class="desc justify-center">
                {{ item.MainCol }}
              </v-list-item-action>
              <v-list-item-content>
                {{ item.DescCol }}
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
    <v-container>
      <v-card>
        <v-list header two-line flat>
          <v-header class="header font-weight-medium">
            Descrição das Barreiras
          </v-header>
          <v-list-item-group v-for="(item, i) in BarreirasDesc" :key="i">
            <v-list-item>
              <v-list-item-action class="desc justify-center">
                {{ item.MainCol }}
              </v-list-item-action>

              <v-list-item-content>
                {{ item.DescCol }}
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import INSSDesc from "@/assets/json/inss.json";
import BarreirasDesc from "@/assets/json/barreiras.json";
export default {
  data: () => ({
    INSSDesc: Object.values(INSSDesc),
    BarreirasDesc: Object.values(BarreirasDesc)
  })
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
  padding: 1rem;
}
</style>
