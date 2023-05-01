import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../components/book/bookSlice'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import PaginationBar from '../components/PaginationBar'
import SearchForm from '../components/SearchForm'
import { BACKEND_API } from '../app/config'
import { FormProvider } from '../form'
import { useForm } from 'react-hook-form'
import {
  Container,
  Alert,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent
} from '@mui/material'
import Grid from '@mui/material/Grid'
const HomePage = () => {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.book.status)
  const books = useSelector((state) => state.book.books)
  const [pageNum, setPageNum] = useState(1)
  const [query, setQuery] = useState('')
  const totalPage = 10
  const limit = 10
  const navigate = useNavigate()
  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`)
  }
  useEffect(() => {
    dispatch(fetchData({ pageNum, limit: 20, query }))
    console.log('query=', query)
  }, [dispatch, pageNum, limit, query])
  // form
  const defaultValues = {
    searchQuery: ''
  }
  const methods = useForm({
    defaultValues
  })
  const { handleSubmit } = methods
  const onSubmit = (data) => {
    setQuery(data.searchQuery)
  }
  return (
    <Container sx={{ mb: '2em' }}>
      <Stack sx={{ display: 'flex', alignItems: 'center', m: '2rem' }}>
        <Typography variant='h3' sx={{ textAlign: 'center' }}>
          Book Store
        </Typography>
        {status && <Alert severity='error'>{status}</Alert>}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent='space-between'
            mb={2}
          >
            <SearchForm />
          </Stack>
        </FormProvider>
        <PaginationBar
          pageNum={pageNum}
          setPageNum={setPageNum}
          totalPageNum={totalPage}
        />
      </Stack>
      <div>
        {status
          ? (
            <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
              <ClipLoader color='inherit' size={150} loading />
            </Box>
            )
          : (
            <Grid container sx={{ justifyContent: 'center', gap: 2 }} spacing={2}>
              {books?.map((book) => (
                <Card
                  key={book.id}
                  onClick={() => handleClickBook(book.id)}
                  sx={{
                    width: '12rem',
                    height: '27rem',
                    marginBottom: '2rem'
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      image={`${BACKEND_API}/${book.imageLink}`}
                      alt={`${book.title}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {`${book.title}`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Grid>
            )}
      </div>
    </Container>
  )
}
export default HomePage
