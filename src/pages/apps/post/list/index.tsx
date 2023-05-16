// ** React Imports
import { useState, useEffect, forwardRef, useContext } from 'react'

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
  Tooltip,
  Typography
} from '@mui/material'
import PostDetailsModal from 'src/views/apps/post/view/PostDetailsModal'
import { PostsTypes } from 'src/types/apps/postTypes'
import Loader from 'src/shared-components/Loader'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from 'src/store'
import { useSelector } from 'react-redux'
import { deletePost, fetchPosts } from 'src/store/apps/post'
import AddPostDrawer from 'src/views/apps/post/list/AddPostDrawer'
import TableHeader from 'src/views/apps/post/list/TableHeader'
// import { fetchCList } from 'src/store/apps/user'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import EditPostModal from 'src/views/apps/post/edit/EditPostModal'
import { UsersType } from 'src/types/apps/userTypes'
import { useDeletePostMutation, useFetchPostsQuery, useFetchPostsforCQuery, useFetchPostsforDMQuery } from 'src/store/query/postApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'
import { AuthContext } from 'src/context/AuthContext'


const InvoiceList = () => {
  // ** State
  const [postPage, setPostPage] = useState<string>('1')
  const [addPostOpen, setAddPostOpen] = useState<boolean>(false)
  // ** Hooks
 
  const {isLoading, isError, error, data: posts} = useFetchPostsQuery(postPage)
  const {isLoading: isLoadingFetchPostsforDm,
     isError: isErrorFetchPostsforDm, 
     error: FetchPostsforDmError,
      data: FetchPostsforDmData} = useFetchPostsforDMQuery(postPage)
  const {isLoading: isLoadingFetchPostsforC,
     isError: isErrorFetchPostsforC, 
     error: FetchPostsforCError,
      data: FetchPostsforCData} = useFetchPostsforCQuery(postPage)
  const [deletePost, {isLoading: isDeletePostLoading, isError: isDeletePostError, error: deletePostError, data: deletePostData}] = useDeletePostMutation()



  // ** Functions
  const toggleAddPostDrawer = () => setAddPostOpen(!addPostOpen)

  const handlePostDelete = (postId: string) => {
    console.log('postId', postId)
    // dispatch(deletePost(postId))
    deletePost(postId)
  }

  

  if(FetchPostsforCData) {
    console.log('C posts are: ', FetchPostsforCData)
  } else if(posts) {
    console.log('posts posts are: ', posts)
  } else if(FetchPostsforDmData) {
    console.log('Dm posts are: ', FetchPostsforDmData)
  }else if (isError) {
    console.log(error)
  } else if(isLoading) {
    console.log('Loading')
  }

  if(isDeletePostLoading) {
    showLoadingAlert()
  } else if (isDeletePostError) {
    showErrorAlert({text: deletePostError.status === 500 ? "Internal Server Error" : deletePostError.data.errorMessage})
  } else if(deletePostData) {
    showSuccessAlert({text: 'Post Deleted'})
  }



  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box bgcolor={'red'} justifyItems={'center'} alignItems={'center'}></Box>
          <CardHeader title='Posts' />
          <TableContainer component={Paper}>
          {isLoading || isLoadingFetchPostsforDm || isLoadingFetchPostsforC ? <Loader /> : 
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableHeader toggle={toggleAddPostDrawer} />
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>

                  <TableCell align='right'>Client</TableCell>

                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(posts && posts.length > 0) ? posts.map(post => (
                  <TableRow
                    key={post._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}>
                    <TableCell component='th' scope='row'>
                      {post.title}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {post.description}
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
                        <Button startIcon={<DeleteForeverIcon />} onClick={() => handlePostDelete(post._id)}></Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )) : 
                (FetchPostsforDmData && FetchPostsforDmData.length > 0) ? FetchPostsforDmData.map(post => (
                  <TableRow
                    key={post._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {post.title}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {post.description}
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
                        <Button startIcon={<DeleteForeverIcon />} onClick={() => handlePostDelete(post._id)}></Button>
                      </Tooltip> 
                    </TableCell>
                  </TableRow>
                )) : (FetchPostsforCData && FetchPostsforCData.length > 0) ? FetchPostsforCData.map(post => (
    
                  <TableRow
                    key={post._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    
                    <TableCell component='th' scope='row'>
                      {post.title}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {post.description}
                    </TableCell>

                    <TableCell align='right'>{post.creator.username}</TableCell> 
                    <TableCell align='right'>
                      <Tooltip title='Post Details' placement='top-start'>
                        <PostDetailsModal post={post}/>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )) : "No Posts to show"}
              </TableBody>
            </Table>}
          </TableContainer>
        </Card>
      </Grid>

      <AddPostDrawer open={addPostOpen} toggle={toggleAddPostDrawer} />
    </Grid>
  )
}

export default InvoiceList
