<template>
  <v-app>
    <navbar></navbar>
    <v-content>
      <v-slide-y-reverse-transition mode="out-in">
        <router-view />
      </v-slide-y-reverse-transition>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/navigation/navbar";
import { createDB, setBooksData } from "./db";
export default {
  name: "App",
  components: { navbar: Navbar },
  data: () => ({
    //
  }),
  async created() {
    try {
      await createDB();
      await setBooksData();
      this.$store.dispatch("getBooksData");
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style lang="css">
  /* width */
  ::-webkit-scrollbar {
    width: 0.6rem;
    /* border-radius: 0.5rem; */
    overflow: visible;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #33333370;
    /* border-radius: 0.5rem; */
    overflow: visible;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #333333cc;
  }
</style>