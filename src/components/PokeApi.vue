<template>
  <Page class="page">
    <ActionBar class="action-bar" title="Pokemon"></ActionBar>
    <GridLayout>
      <ListView for="p in pokemon" class="list-group">
        <v-template>
          <StackLayout class="list-group-item">
            <Label :text="p.name" />
          </StackLayout>
        </v-template>
      </ListView>
    </GridLayout>
  </Page>
</template>

<script>
import * as http from "http";
export default {
  data() {
    return {
      pokemon: []
    };
  },
  mounted() {
    http
      .getJSON("https://pokeapi.co/api/v2/pokemon/?limit=151")
      .then(result => {
        this.pokemon = result.results;
        //   },
        //   error => {
        //     console.log(error);
      });
  }
};
</script>

<style scoped></style>
