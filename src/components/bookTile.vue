<template>
  <v-card>
    <v-card-title primary-title class="subtitle-1 grey lighten-2">{{book.title}}</v-card-title>
    <v-card-text class="pa-2 data">
      <p v-if="checkVisibility('Author')" class="pa-2 data">{{ book.authors}}</p>
      <p
        class="text-cetner pa-2 data"
        v-if="checkVisibility('Rating Counts')"
      >Rating Count : {{book.ratings_count}}</p>
      <p
        class="text-cetner pa-2 data"
        v-if="checkVisibility('Language Code')"
      >Language : {{book.language_code}}</p>
      <v-rating
        :value="book.average_rating"
        v-if="checkVisibility('Ratings')"
        background-color="yellow"
        color="yellow"
      ></v-rating>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="green" @click="addToCart(book)" fab small text>
        <v-icon>shopping_cart</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- <v-btn color="success" @click="buy(book)">Buy</v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["book", "options"],
  data() {
    return {
      displayOptions: this.options
    };
  },
  methods: {
    addToCart(book) {
      this.$store.dispatch("addToCart", book);
    },
    checkVisibility(dataitem) {
      return this.displayOptions[0].indexOf(dataitem) != -1 ? true : false;
    }
  },
  watch: {
    options: function() {
      this.$set(this, "displayOptions", this.options);
    }
  }
};
</script>

<style lang="css">
  p.data {
    margin: 0;
  }
</style>
