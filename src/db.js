import { fetchAllBooks } from './utilities'

let db
export const createDB = () => {
  let dbReq = indexedDB.open('bookWormDB', 1)

  return new Promise((resolve, reject) => {
    dbReq.onupgradeneeded = function(event) {
      db = event.target.result
      db.createObjectStore('books', { autoIncrement: true })
    }
    dbReq.onsuccess = function(event) {
      db = event.target.result
      resolve()
    }
    dbReq.onerror = function(event) {
      alert('error opening database ' + event.target.errorCode)
      reject()
    }
  })
}

export const setBooksData = async () => {
  let tx = db.transaction(['books'], 'readwrite')
  let booksStore = tx.objectStore('books')
  let req = booksStore.count()
  return new Promise((resolve, reject) => {
    req.onsuccess = async function(event) {
      let count = event.target.result
      if (count > 0) {
        return resolve()
      }
      const books = await fetchAllBooks()
      books.forEach(book => {
        booksStore.add(book)
      })
      tx.oncomplete = () => {
        console.log('All books added')
        resolve()
      }
    }
    req.onerror = function() {
      console.log('Error while counting store entries')
      reject()
    }
  })
}

export const getAllBooks = () => {
  let tx = db.transaction(['books'], 'readwrite')
  let booksStore = tx.objectStore('books')
  let req = booksStore.openCursor()
  let allBooks = []
  return new Promise((resolve, reject) => {
    req.onsuccess = function(event) {
      let cursor = event.target.result
      if (cursor != null) {
        allBooks.push(cursor.value)
        cursor.continue()
      } else {
        resolve(allBooks)
      }
    }
    req.onerror = function(event) {
      reject('error in cursor request ' + event.target.errorCode)
    }
  })
}

export const getBookByID = id => {
  let tx = db.transaction(['books'], 'readwrite')
  let booksStore = tx.objectStore('books')
  let req = booksStore.get(id)
  return new Promise((res, rej) => {
    req.onsuccess = function(event) {
      let note = event.target.result
      if (note) {
        res(note)
      } else {
        rej(`Book ${id}  not found`)
      }
    }
  })
}
