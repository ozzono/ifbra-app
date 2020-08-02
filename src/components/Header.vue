<template>
  <v-card class="overflow-hidden" height="400">
    <v-app-bar dense dark>
      <div class="hidden-md-and-up">
        <v-btn @click="drawer = true">Menu</v-btn>
      </div>
      <div class="hidden-sm-and-down">
        <v-btn v-for="(item, i) in menu" :key="i" :to="item">{{ item }}</v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-toolbar-title>IFBr-A</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="(item, i) in menu" :key="i" :to="item">
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    menu: ["Home", "Legenda", "Manual", "CID10"]
  })
};
</script>

<style scoped>
v-app-bar {
  border-radius: 0 0 0 0;
}
</style>
