<template>
  <v-app-bar app clipped-left color="blue darken-4" dark>
    <v-toolbar-title v-text="'Bookworm'"></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon text to="/cart" class="mr-6">
      <v-icon color="white lighten-1">shopping_cart</v-icon>
      <v-badge color="cyan">
        <template v-slot:badge>
          <span>{{ $store.getters.cartLength }}</span>
        </template>
      </v-badge>
    </v-btn>
    <v-btn icon text to="/" class="mr-2">
      <v-icon color="white lighten-1">home</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  methods: {}
};
</script>

<style>
</style>
