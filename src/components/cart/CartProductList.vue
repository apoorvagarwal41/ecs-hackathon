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
      return this.$store.state.cart;
    },
    totalAmount() {
      console.log("Calculating total amount");
      let totalamount = this.cartEntries.reduce((acc, book) => {
        return acc + book.price * book.count;
      }, 0);
      this.$emit("on-amount", totalamount);
      return totalamount;
    }
  },
  components: {
    ProductTile
  }
};
</script>

<style>
</style>
