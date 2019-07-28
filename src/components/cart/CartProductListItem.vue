<template>
  <v-layout row wrap justify-center align-content-center align-center>
    <v-flex xs12 lg10 xl8 class="pa-4">
      <v-card class="pa-3 mt-2">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs8 md-6>
              <div class="pa-2">
                <h2>{{book.title}}</h2>
                <p class="mt-2">{{book.authors}}</p>
              </div>
            </v-flex>
            <v-flex xs4 justify-center align-center d-flex column>
              <v-layout column wrap>
                <v-layout
                  row
                  wrap
                  justify-center
                  align-content-center
                  align-center
                >{{`Rs.${book.price * book.count}`}}</v-layout>
                <v-layout row wrap justify-center align-content-center align-center class="mt-2">
                  <v-btn color="primary" fab dark small @click="decrementBookFromCart(book)">
                    <v-icon>remove</v-icon>
                  </v-btn>
                  <span class="px-3">{{book.count}}</span>
                  <v-btn color="primary" fab dark small @click="incrementBookFromCart(book)">
                    <v-icon>add</v-icon>
                  </v-btn>
                </v-layout>
                <v-layout row wrap justify-center align-content-center align-center class="mt-2">
                  <v-btn color="error" outlined class="mt-3" @click="removeFromCart(book)">Delete</v-btn>
                </v-layout>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["product"],
  computed: {
    book() {
      return this.product;
    }
  },
  methods: {
    ...mapActions([
      "incrementBookFromCart",
      "decrementBookFromCart",
      "removeFromCart"
    ])
  }
};
</script>

<style>
</style>
