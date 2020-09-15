<template>
  <div>
    <v-card>
      <v-app-bar
        tile
        fixed
        :class="`${!theme.dark ? 'light-blue darken-3' : ''}`"
      >
        <div class="hidden-md-and-up">
          <v-btn @click="drawer = true">Menu</v-btn>
        </div>
        <v-toolbar-title class="title">IFBr-A</v-toolbar-title>
        <div class="hidden-sm-and-down">
          <v-btn
            depressed
            :active-class="
              `${
                theme.dark
                  ? 'deep-purple--text text--accent-4'
                  : 'blue--text text--accent-4'
              }`
            "
            :class="`${!theme.dark ? 'blue--text text--accent-4' : ''}`"
            v-for="(item, i) in menu"
            :key="i"
            :to="item[1]"
            class="margin"
            tile
          >
            {{ item[0] }}
          </v-btn>
        </div>
        <v-spacer />
        <PrintVersion />
        <Theme />
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" height="400" absolute temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item v-for="(item, i) in menu" :key="i" :to="item[1]">
              <v-list-item-title>{{ item[0] }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <div class="filler" :class="`${!theme.dark ? theme.color : ''}`" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    drawer: false,
    menu: [
      ["Formulários", "/"],
      ["Legenda", "legenda"],
      ["Manual", "manual"],
      ["CID10", "cid10"]
    ]
  }),
  components: {
    Theme: () => import("@/components/Theme"),
    PrintVersion: () => import("@/components/PrintVersion")
  },
  computed: mapGetters(["theme"])
};
</script>

<style scoped>
.title {
  padding: 1rem;
}
.filler {
  height: 5rem;
}
.margin{
  margin-right: 0.2rem;
}
</style>
