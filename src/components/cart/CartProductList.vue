<template>
  <v-container grid-list-md>
    <product-tile
      v-for="(book) in cartEntries"
      :key="book.bookID.toString() + book.count.toString()"
      :product="book"
    ></product-tile>
  </v-container>
</template>

<script>
import ProductTile from "./CartProductListItem";
import { mapState } from "vuex";
export default {
  computed: {
    cartEntries() {
      let entries = [...this.$store.state.cart];
      this.sendTotalAmount(entries);
      return entries;
    }
  },
  components: {
    ProductTile
  },
  methods: {
    sendTotalAmount(cartEntries) {
      console.log("Calculating total amount");
      var entries = [...cartEntries];
      let totalamount = entries.reduce((acc, book) => {
        return acc + book.price * book.count;
      }, 0);
      this.$emit("on-amount", totalamount);
    }
  }
};
</script>

<style>
</style>
