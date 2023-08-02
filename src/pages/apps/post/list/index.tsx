// ** React Imports
import { useContext, useState } from 'react'

// ** MUI Imports
import { Box, Button, Card, CardContent, CardHeader, Grid, Pagination, TextField, Typography } from '@mui/material'

import {
  useDeletePostMutation,
  useFetchPostsQuery,
  useFetchPostsforCQuery,
  useFetchPostsforCmQuery,
  useFetchPostsforDMQuery,
  useSearchPostsMutation
} from 'src/store/query/postApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'
import Swal from 'sweetalert2'
import PostListTable from 'src/views/apps/post/list/PostListTable'

import { AuthContext } from 'src/context/AuthContext'

const InvoiceList = () => {
  // ** State

  const [page, setPage] = useState<number>(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  // const postPage = '1'

  // ** Hooks
  const { user } = useContext(AuthContext)

  const [
    searchPosts,
    {
      // isFetching: isFetchingSearchPosts,
      data: searchPost
    }
  ] = useSearchPostsMutation()

  const {
    isFetching,
    isLoading,
    // isError, error,
    data: posts
  } = useFetchPostsQuery(page)

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
    { isLoading: isLoadingDeletePost, isError: isDeletePostError, error: deletePostError, data: deletePostData }
  ] = useDeletePostMutation()

  // ** Functions

  const handleSearchTextChange = (searchStr: string) => {
    searchPosts(searchStr)
  }

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

  if (isLoadingDeletePost) {
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

  if (searchPost) {
    console.log('search results are', searchPost)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Published Posts' />
          {/* <TableHeader /> */}
          <Box
            justifyItems={'center'}
            alignItems={'center'}
            sx={{
              px: 4,
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
              justifyContent: 'space-between'
            }}
          >
            <TextField
              size={'medium'}
              id='outlined-basic'
              label='Search by post title or client name'
              variant='outlined'
              sx={{ width: 400 }}
              onChange={e => handleSearchTextChange(e.target.value)}
            />

            <Button variant='outlined' sx={{ width: 200 }} size={'large'}>
              Filter
            </Button>
          </Box>

          <PostListTable
            isFetching={
              ((user!.role === 'A' || user!.role === 'BA') && isFetching) ||
              (user!.role === 'DM' && isFetchingFetchPostsforDm) ||
              (user!.role === 'C' && isFetchingFetchPostsforC) ||
              (user!.role === 'CM' && isFetchingFetchPostsforCm)
            }
            posts={
              searchPost
                ? searchPost
                : posts && posts?.length > 0
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
          <CardContent>
            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default InvoiceList
