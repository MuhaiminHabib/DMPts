// ** React Imports
import { useContext, useEffect, useState } from 'react'

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
import { display } from '@mui/system'

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

  useEffect(() => {
    if (posts) {
      console.log('posts is ho ho ho:', posts.postings)
    }
    console.log('hiii there')
  }, [posts])

  if (isLoadingDeletePost) {
    showLoadingAlert()
  } else if (isDeletePostError) {
    showErrorAlert({ error: deletePostError })
  } else if (deletePostData) {
    showSuccessAlert({ text: 'Post Deleted' })
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
                : posts && posts.postings?.length > 0
                ? posts.postings
                : FetchPostsforDmData && FetchPostsforDmData.postings?.length > 0
                ? FetchPostsforDmData.postings
                : FetchPostsforCData && FetchPostsforCData.postings?.length > 0
                ? FetchPostsforCData.postings
                : FetchPostsforCmData && FetchPostsforCmData.postings?.length > 0
                ? FetchPostsforCmData.postings
                : []
            }
            // posts={posts ? posts.postings : null}
            handlePostDelete={handlePostDelete}
          />

          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={posts ? Math.ceil(posts.info.totalNumberOfPostings / 10) : 1}
              page={page}
              onChange={handleChange}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default InvoiceList
