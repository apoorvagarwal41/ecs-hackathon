<template>
  <v-container grid-list-xl>
    <v-layout row align-center>
      <v-flex>
        <v-card>
          <v-card-text>
            <v-text-field placeholder="Search" v-model="searchKey">
              <v-icon slot="prepend" color="blue">search</v-icon>
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row align-center mt-5>
      <v-flex xs12>
        <v-card>
          <v-card-actions>
            <v-layout row wrap justify-space-between align-center>
              <v-flex xs12 md6>
                <v-select
                  v-model="selectedDataItems"
                  :items="dataItems"
                  chips
                  label="Show"
                  multiple
                  outlined
                ></v-select>
              </v-flex>
              <v-flex xs12 md3>
                <v-switch v-model="sortByRating" label="Sort By Ratings"></v-switch>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row align-center justify-center mt-5>
      <v-pagination v-model="currentPage" :length="paginationLength"></v-pagination>
    </v-layout>
    <v-layout row wrap justify-center align-center mt-5 xs-8>
      <v-flex xs6 md4 lg3 xl3 v-for="(book, index) in visibleBooks" :key="index">
        <book-tile :book="book" :options="[selectedDataItems]"></book-tile>
      </v-flex>
    </v-layout>
    <v-layout row align-center justify-center mt-5>
      <v-pagination v-model="currentPage" :length="paginationLength"></v-pagination>
    </v-layout>
  </v-container>
</template>

<script>
import BookTile from "../components/bookTile";
import _ from "lodash";

export default {
  components: {
    "book-tile": BookTile
  },
  data() {
    return {
      visibleBooks: [],
      itemsPerPage: 12,
      currentPage: 1,
      searchKey: "",
      books: [],
      sortByRating: false,
      dataItems: ["Ratings", "Author", "Language Code", "Rating Counts"],
      selectedDataItems: ["Ratings", "Author"]
    };
  },
  mounted() {
    this.setVisibleBooks();
  },
  computed: {
    allBooks() {
      return this.$store.state.books;
    },
    filteredBooks: {
      get() {
        return this.searchKey == "" ? [...this.allBooks] : [...this.books];
      },
      set(books) {
        this.books = [...books];
        this.currentPage = 1;
        this.setVisibleBooks();
      }
    },
    isBookDataAvailable() {
      return this.allBooks.length > 0 ? true : false;
    },
    paginationLength() {
      if (this.allBooks) {
        return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
      }
      return 0;
    }
  },
  watch: {
    allBooks: function() {
      if (this.isBookDataAvailable) {
        this.setVisibleBooks();
      }
    },
    currentPage: function() {
      if (this.isBookDataAvailable) {
        this.setVisibleBooks();
      }
    },
    searchKey: _.debounce(function() {
      this.filterPosts();
    }, 300),
    sortByRating: function() {
      this.setVisibleBooks();
    }
  },
  methods: {
    setVisibleBooks() {
      const m = [];
      let sortedBooks = [...this.filteredBooks];
      if (this.sortByRating) {
        sortedBooks.sort((a, b) => b.average_rating - a.average_rating);
      }
      if (this.isBookDataAvailable) {
        const lowerLimit = (this.currentPage - 1) * this.itemsPerPage;
        const upperLimit =
          this.currentPage === this.paginationLength
            ? sortedBooks.length
            : this.currentPage * this.itemsPerPage;
        // Selecting a range of filteredBooks for pagination
        for (let i = lowerLimit; i < upperLimit; i++) {
          m.push(sortedBooks[i]);
        }
      }
      this.visibleBooks = m;
    },
    filterPosts() {
      console.log("Filtering Posts");
      this.filteredBooks = this.allBooks.filter(
        book => book.title.toLowerCase().indexOf(this.searchKey) != -1
      );
    }
  }
};
</script>
