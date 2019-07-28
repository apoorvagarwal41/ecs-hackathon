<template>
  <v-dialog v-model="openDialogue" width="500">
    <v-card>
      <v-card-title class="title font-weight-regular justify-space-between grey lighten-2">
        <span class="headline">Payment</span>
        <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
      </v-card-title>
      <v-divider></v-divider>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <p class="title">Select Address</p>
            <v-radio-group v-model="address" column>
              <v-radio
                label="New Door Hostels, Manipal University Jaipur, Jaipur ,Rajasthan"
                value="1"
                class="mt-3"
              ></v-radio>
              <v-radio
                label="Flat No. - 107, Ganpati Apartments, Kashipur ,Uttarakhand"
                value="2"
                class="mt-3"
              ></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <p class="title">Payment Method</p>
            <v-radio-group v-model="mode" column>
              <v-radio label="Netbanking" value="1" class="mt-3"></v-radio>
              <v-radio label="Credit/Debit Card" value="2" class="mt-3"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <v-card-text justify-center>
            <p class="title center">Amount</p>
            <div class="text-xs-center">Rs. {{ amount }}</div>
            <v-btn block color="success" @click="payNow" :loading="loading">Pay Now</v-btn>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="4">
          <v-card-text justify-center>
            <p class="title center">Order Placed</p>
            <div class="text-xs-center">ID: asdh123hjasdk</div>
          </v-card-text>
        </v-window-item>
      </v-window>
      <v-divider></v-divider>

      <v-card-actions>
        <v-btn :disabled="step === 1" outlined @click="step--">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn :disabled="step === 3" color="primary" depressed @click="step++" v-if="step < 3">Next</v-btn>
        <v-btn
          :disabled="loading"
          color="primary"
          depressed
          @click="openDialogue = false"
          v-if="step != 4"
        >Cancel</v-btn>
        <v-btn color="success" v-if="step == 4">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["open", "amount", "successCb"],
  data() {
    return {
      address: null,
      mode: null,
      loading: false,
      step: 1,
      id: null,
      openDialogue: this.open,
      totalAmount: this.amount
    };
  },
  watch: {
    openDialogue: function() {
      if (!this.openDialogue) {
        this.step = 1;
        this.$emit("on-close");
      }
    },
    open: function() {
      this.openDialogue = this.open;
    },
    amount: function() {
      this.$set(this, "totalAmount", this.amount);
    }
  },
  methods: {
    async payNow() {
      const self = this;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      alert("Payment Successfull");
    }
  }
};
</script>

<style>
</style>
