// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import {
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



const InvoiceList = () => {
  // ** State
  const [postPage, setPostPage] = useState<number>(1)
  // ** Hooks

  const dispatch = useDispatch<AppDispatch>()
  const {posts, isLoading} = useSelector((state: RootState) => state.post)

  useEffect(() => {
    dispatch(fetchPosts({
      page: postPage
    }))
  }, [])



  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>

        
        <Card>
          <Box bgcolor={'red'} justifyItems={'center'} alignItems={'center'}></Box>

          <CardHeader title='Posts' />
          {/* {showHeader ? <TableHeader toggle={toggleAddUserDrawer} /> : null} */}
          <TableContainer component={Paper}>
          {isLoading ? <Loader /> : 
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
}
          </TableContainer>
        </Card>
      </Grid>

      {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
    </Grid>
  )
}

export default InvoiceList
