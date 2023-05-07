// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import {
  Alert,
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import PostDetailsModal from 'src/views/apps/post/view/PostDetailsModal'
import { PostsTypes } from 'src/types/apps/postTypes'
import Loader from 'src/shared-components/Loader'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useSelector } from 'react-redux'
import { fetchPosts } from 'src/store/apps/post'
import AddPostDrawer from 'src/views/apps/post/list/AddPostDrawer'
import TableHeader from 'src/views/apps/post/list/TableHeader'
import { fetchCList } from 'src/store/apps/user'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import EditPostModal from 'src/views/apps/post/edit/EditPostModal'


const InvoiceList = () => {
  // ** State
  const [postPage, setPostPage] = useState<number>(1)
  const [addPostOpen, setAddPostOpen] = useState<boolean>(false)
  // ** Hooks

  const dispatch = useDispatch<AppDispatch>()
  const {posts, isLoading} = useSelector((state: RootState) => state.post)

  useEffect(() => {
    dispatch(fetchCList())
    dispatch(fetchPosts({
      page: postPage
    }))
  }, [])

  // ** Functions
  const toggleAddPostDrawer = () => setAddPostOpen(!addPostOpen)



  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box bgcolor={'red'} justifyItems={'center'} alignItems={'center'}></Box>
          <CardHeader title='Posts' />
          <TableContainer component={Paper}>
          {isLoading ? <Loader /> : 
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                <TableHeader toggle={toggleAddPostDrawer} />
                  <TableCell>Title</TableCell>

                  <TableCell align='right'>Creator</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map(post => (
                  <TableRow
                    key={post._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {post.title}
                    </TableCell>

                    <TableCell align='right'>{post.creator.username}</TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Post Details' placement='top-start'>
                        <PostDetailsModal post={post}/>
                      </Tooltip>
                      <Tooltip title='Post Edit' placement='top-start'>
                        <EditPostModal post={post}/>
                      </Tooltip>
                      <Tooltip title='Post Delete' placement='top-start'>
                        <Button startIcon={<DeleteForeverIcon />}></Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
}
          </TableContainer>
        </Card>
      </Grid>

      <AddPostDrawer open={addPostOpen} toggle={toggleAddPostDrawer} />
    </Grid>
  )
}

export default InvoiceList
