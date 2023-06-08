// ** React Imports
import { useContext, useState } from 'react'

// ** MUI Imports
import { Box, Card, CardHeader, Grid } from '@mui/material'
import AddPostDrawer from 'src/views/apps/post/list/AddPostDrawer'
import {
  useDeletePostMutation,
  useFetchPostsQuery,
  useFetchPostsforCQuery,
  useFetchPostsforCmQuery,
  useFetchPostsforDMQuery
} from 'src/store/query/postApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'
import Swal from 'sweetalert2'
import PostListTable from 'src/views/apps/post/list/PostListTable'
import TableHeader from 'src/views/apps/post/list/TableHeader'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { AuthContext } from 'src/context/AuthContext'

const InvoiceList = () => {
  // ** State

  // const [postPage, setPostPage] = useState<string>('1')

  const postPage = '1'
  const [addPostOpen, setAddPostOpen] = useState<boolean>(false)

  // ** Hooks
  const { user } = useContext(AuthContext)
  const ability = useContext(AbilityContext)
  const {
    isFetching,

    // isError, error,
    data: posts
  } = useFetchPostsQuery(postPage)

  const {
    isFetching: isFetchingFetchPostsforDm,

    //  isError: isErrorFetchPostsforDm,
    //  error: FetchPostsforDmError,
    data: FetchPostsforDmData
  } = useFetchPostsforDMQuery()

  const {
    isFetching: isFetchingFetchPostsforC,

    //  isError: isErrorFetchPostsforC,
    //  error: FetchPostsforCError,
    data: FetchPostsforCData
  } = useFetchPostsforCQuery()
  const {
    isFetching: isFetchingFetchPostsforCm,

    //  isError: isErrorFetchPostsforCm,
    //  error: FetchPostsforCmError,
    data: FetchPostsforCmData
  } = useFetchPostsforCmQuery()

  const [
    deletePost,
    { isFetching: isDeletePostLoading, isError: isDeletePostError, error: deletePostError, data: deletePostData }
  ] = useDeletePostMutation()

  // ** Functions

  const toggleAddPostDrawer = () => setAddPostOpen(!addPostOpen)

  const showDeleteConfirmationPopup = (postId: string, title: string) => {
    Swal.fire({
      title: `Do you want to delete ${title}?`,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      denyButtonText: `Cancel`
    }).then(result => {
      if (result.isConfirmed) {
        deletePost(postId)
      }
    })
  }

  const handlePostDelete = (postId: string, title: string) => {
    console.log('postId', postId)
    showDeleteConfirmationPopup(postId, title)
  }

  if (isDeletePostLoading) {
    showLoadingAlert()
  } else if (isDeletePostError) {
    showErrorAlert({ error: deletePostError })
  } else if (deletePostData) {
    showSuccessAlert({ text: 'Post Deleted' })
  }

  if (FetchPostsforCData) {
    console.log('FetchPostsforCData is:', FetchPostsforCData)
    console.log('posts is:', posts)
    console.log('FetchPostsforDmData is:', FetchPostsforDmData)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box bgcolor={'red'} justifyItems={'center'} alignItems={'center'}></Box>
          {ability?.can('read', 'add-post') ? (
            <CardHeader title='Posts' action={<TableHeader toggle={toggleAddPostDrawer} />} />
          ) : (
            <CardHeader title='Posts' />
          )}
          <PostListTable
            isFetching={
              ((user!.role === 'A' || user!.role === 'BA') && isFetching) ||
              (user!.role === 'DM' && isFetchingFetchPostsforDm) ||
              (user!.role === 'C' && isFetchingFetchPostsforC) ||
              (user!.role === 'CM' && isFetchingFetchPostsforCm)
            }
            posts={
              posts && posts?.length > 0
                ? posts
                : FetchPostsforDmData && FetchPostsforDmData.length > 0
                ? FetchPostsforDmData
                : FetchPostsforCData && FetchPostsforCData?.length > 0
                ? FetchPostsforCData
                : FetchPostsforCmData && FetchPostsforCmData?.length > 0
                ? FetchPostsforCmData
                : []
            }
            handlePostDelete={handlePostDelete}
          />
        </Card>
      </Grid>

      <AddPostDrawer open={addPostOpen} toggle={toggleAddPostDrawer} />
    </Grid>
  )
}

export default InvoiceList
