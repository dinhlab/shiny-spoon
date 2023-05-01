import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Button,
  Box,
  Card,
  Stack,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent
} from '@mui/material'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { BACKEND_API } from '../app/config'
import { getReadingList, removeBook } from '../components/book/bookSlice'
const ReadingPage = () => {
  const [removedBookId, setRemovedBookId] = useState('')
  const readinglist = useSelector((state) => state.book.readinglist)
  const status = useSelector((state) => state.book.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`)
  }
  const handleRemoveBook = (bookId) => {
    setRemovedBookId(bookId)
  }
  useEffect(() => {
    if (removedBookId) return
    dispatch(getReadingList())
  }, [dispatch, removedBookId])
  useEffect(() => {
    if (!removedBookId) return
    dispatch(removeBook(removedBookId))
    setRemovedBookId('')
  }, [dispatch, removedBookId])
  console.log(readinglist)
  return (
    <Container>
      <Typography variant='h3' sx={{ textAlign: 'center' }} m={3}>
        Book Store
      </Typography>
      {status
        ? (
          <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
            <ClipLoader color='inherit' size={150} loading />
          </Box>
          )
        : (
          <Stack
            direction='row'
            spacing={2}
            justifyContent='flex-start'
            flexWrap='wrap'
          >
            {readinglist?.map((book) => (
              <Card
                key={book.id}
                sx={{
                  width: '12rem',
                  height: '27rem',
                  marginBottom: '2rem',
                  position: 'relative'
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component='img'
                    image={`${BACKEND_API}/${book.imageLink}`}
                    alt={`${book.title}`}
                    onClick={() => handleClickBook(book.id)}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {`${book.title}`}
                    </Typography>
                    <Typography gutterBottom variant='body1' component='div'>
                      {`${book.author}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: 'secondary.light',
                    color: 'secondary.contrastText',
                    padding: '0',
                    minWidth: '1.5rem'
                  }}
                  size='small'
                  onClick={() => handleRemoveBook(book.id)}
                >
                  &times;
                </Button>
              </Card>
            ))}
          </Stack>
          )}
    </Container>
  )
}
export default ReadingPage
