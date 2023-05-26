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
import Swal from 'sweetalert2'
import PostListTable from 'src/views/apps/post/list/PostListTable'



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

  const showDeleteConfirmationPopup = (postId: string, title: string ) => {
    Swal.fire({
      title: `Do you want to delete ${title}?`,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(postId)
      }
    })
  }

  const handlePostDelete = (postId: string, title: string) => {
    console.log('postId', postId)
    showDeleteConfirmationPopup(postId, title)
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

          <PostListTable 
            isLoading={isLoading || isLoadingFetchPostsforDm || isLoadingFetchPostsforC} 
            posts={posts ? posts : FetchPostsforDmData? FetchPostsforDmData : FetchPostsforCData? FetchPostsforCData : []}
            handlePostDelete={handlePostDelete}/>
        </Card>
      </Grid>

      <AddPostDrawer open={addPostOpen} toggle={toggleAddPostDrawer} />
    </Grid>
  )
}

export default InvoiceList
