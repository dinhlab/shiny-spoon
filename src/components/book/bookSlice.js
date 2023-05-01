import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../app/apiService'
import { fetchBooks } from './bookAPI'
import { toast } from 'react-toastify'
const initialState = {
  books: [],
  readinglist: [],
  bookDetail: null,
  status: null
}
export const addToReadingList = createAsyncThunk(
  'book/addToReadingList',
  async (book) => {
    const response = await api.post('/favorites', book)
    return response.data
  }
)
export const getReadingList = createAsyncThunk(
  'book/getReadingList',
  async () => {
    const response = await api.get('/favorites')
    return response.data
  }
)
export const removeBook = createAsyncThunk(
  'book/removeBook',
  async (removedBookId) => {
    const response = await api.delete(`/favorites/${removedBookId}`)
    console.log(response)
    return response.data
  }
)
export const getBookDetail = createAsyncThunk(
  'book/getBookDetail',
  async (bookId) => {
    const response = await api.get(`/books/${bookId}`)
    return response.data
  }
)
export const fetchData = createAsyncThunk('book/fetchData', async (props) => {
  const response = await fetchBooks(props)
  return response.data
})
export const bookSlice = createSlice({
  name: 'book',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'fetchData pending'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = null
        state.books = action.payload
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'fetchData rejected'
      })
    builder
      .addCase(addToReadingList.pending, (state) => {})
      .addCase(addToReadingList.fulfilled, (state, action) => {
        console.log('addToReadingList action.payload=', action.payload)
        toast.success('The book has been added to the reading list!')
      })
      .addCase(addToReadingList.rejected, (state, action) => {
        toast.error(action.error.message)
      })
    builder
      .addCase(getReadingList.pending, (state) => {
        state.status = 'getReadingList pending'
      })
      .addCase(getReadingList.fulfilled, (state, action) => {
        state.status = null
        state.readinglist = action.payload
      })
      .addCase(getReadingList.rejected, (state, action) => {
        state.status = 'getReadingList rejected'
      })
    builder
      .addCase(removeBook.pending, (state) => {
        state.status = 'removeBook pending'
      })
      .addCase(removeBook.fulfilled, (state, action) => {
        state.status = null
        toast.success('The book has been removed')
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.status = 'removeBook rejected'
      })
    builder
      .addCase(getBookDetail.pending, (state) => {
        state.status = 'getBookDetail pending'
      })
      .addCase(getBookDetail.fulfilled, (state, action) => {
        state.status = null
        state.bookDetail = action.payload
      })
      .addCase(getBookDetail.rejected, (state, action) => {
        state.status = 'getBookDetail rejected'
      })
  }
})
export default bookSlice.reducer
