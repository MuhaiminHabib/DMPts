// ** React Imports
import { useState, useContext } from 'react'

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
  Tooltip,

} from '@mui/material'
import PostDetailsModal from 'src/views/apps/post/view/PostDetailsModal'

import Loader from 'src/shared-components/Loader'

import AddPostDrawer from 'src/views/apps/post/list/AddPostDrawer'
import TableHeader from 'src/views/apps/post/list/TableHeader'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import EditPostModal from 'src/views/apps/post/edit/EditPostModal'

import { useDeletePostMutation, useFetchPostsQuery, useFetchPostsforCQuery, useFetchPostsforDMQuery } from 'src/store/query/postApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'

import { AbilityContext } from 'src/layouts/components/acl/Can'



const InvoiceList = () => {
  // ** State

  // const [postPage, setPostPage] = useState<string>('1')

  const postPage = '1'
  const [addPostOpen, setAddPostOpen] = useState<boolean>(false)

  // ** Hooks
  const ability = useContext(AbilityContext)
  const {isLoading, 

    // isError, error, 
    data: posts} = useFetchPostsQuery(postPage)

  const {isLoading: isLoadingFetchPostsforDm,

    //  isError: isErrorFetchPostsforDm, 
    //  error: FetchPostsforDmError,
      data: FetchPostsforDmData} = useFetchPostsforDMQuery()
  const {isLoading: isLoadingFetchPostsforC,

    //  isError: isErrorFetchPostsforC, 
    //  error: FetchPostsforCError,
      data: FetchPostsforCData} = useFetchPostsforCQuery()
  const [deletePost, {
    isLoading: isDeletePostLoading, 
    isError: isDeletePostError,
    error: deletePostError, 
    data: deletePostData
  }] = useDeletePostMutation()



  // ** Functions

  const toggleAddPostDrawer = () => setAddPostOpen(!addPostOpen)

  const handlePostDelete = (postId: string) => {
    console.log('postId', postId)
    deletePost(postId)
  }

  

  if(isDeletePostLoading) {
    showLoadingAlert()
  } else if (isDeletePostError) {
    showErrorAlert({error : deletePostError})
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
              {ability?.can('read', 'add-post') ? (<TableHeader toggle={toggleAddPostDrawer} />) : null}
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
