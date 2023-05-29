// ** React Imports
import { useContext, useState } from 'react'

// ** MUI Imports
import {
  Box,
  Card,
  CardHeader,
  Grid,
} from '@mui/material'
import AddPostDrawer from 'src/views/apps/post/list/AddPostDrawer'
import { useDeletePostMutation, useFetchPostsQuery, useFetchPostsforCQuery, useFetchPostsforDMQuery } from 'src/store/query/postApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'
import Swal from 'sweetalert2'
import PostListTable from 'src/views/apps/post/list/PostListTable'
import TableHeader from 'src/views/apps/post/list/TableHeader'
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
          {ability?.can('read', 'add-post') ?
          <CardHeader title='Client Managers' action={
            <TableHeader toggle={toggleAddPostDrawer} /> }
            /> :
            <CardHeader title='Posts' />
          }
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
