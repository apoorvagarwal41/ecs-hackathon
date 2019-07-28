import Vue from 'vue'
import Vuex from 'vuex'
import { getAllBooks } from './db'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    books: [],
    cart: []
  },
  getters: {
    cartLength: state => {
      return state.cart.length
    }
  },
  mutations: {
    setBooks(state, books) {
      state.books = books
    },
    updateCart(state, cart) {
      state.cart = [...cart]
    }
  },
  actions: {
    async getBooksData(store) {
      const books = await getAllBooks()
      store.commit('setBooks', books)
      return books
    },
    addToCart(store, book) {
      let cart = store.state.cart
      const bookIndex = cart.findIndex(item => item.bookID === book.bookID)
      if (bookIndex === -1) {
        book.count = 1
        cart = [...cart, book]
        store.commit('updateCart', cart)
      } else {
        cart[bookIndex].count++
        store.commit('updateCart', cart)
      }
    },
    removeFromCart(store, book) {
      let cart = store.state.cart
      const bookIndex = cart.findIndex(item => item.bookID === book.bookID)
      book.count = 1
      cart.splice(bookIndex, 1)
      store.commit('updateCart', cart)
    },
    decrementBookFromCart(store, book) {
      let cart = store.state.cart
      const bookIndex = cart.findIndex(item => item.bookID === book.bookID)
      if (cart[bookIndex].count === 1) {
        store.dispatch('removeFromCart', book)
      } else {
        cart[bookIndex].count--
        store.commit('updateCart', cart)
      }
    },
    incrementBookFromCart(store, book) {
      let cart = store.state.cart
      const bookIndex = cart.findIndex(item => item.bookID === book.bookID)
      cart[bookIndex].count++
      store.commit('updateCart', cart)
    }
  }
})
