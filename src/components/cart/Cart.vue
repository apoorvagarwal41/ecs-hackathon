<template>
  <v-container grid-list-lg>
    <v-card>
      <v-card-title primary-title class="red white--text">Cart</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-divider class="mb-4"></v-divider>
          <v-flex xs12>
            <product-list @on-amount="setAmount"></product-list>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="openCheckout=true">Checkout</v-btn>
      </v-card-actions>
    </v-card>
    <payment :open="openCheckout" :amount="amount" :successCb="success" @on-close="closeCheckout"></payment>
  </v-container>
</template>

<script>
import ProductList from "./CartProductList";
import Payment from "../payment";
export default {
  data() {
    return {
      openCheckout: false,
      amount: 0
    };
  },
  components: {
    ProductList,
    Payment
  },
  methods: {
    closeCheckout() {
      console.log("Close Checkout");
      this.openCheckout = false;
    },
    success() {
      console.log("payment complete");
    },
    setAmount(totalamount) {
      console.log(totalamount);
      this.amount = totalamount;
    }
  }
};
</script>

<style>
</style>
