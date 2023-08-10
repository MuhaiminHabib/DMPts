// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Box, Card, CardContent, CardHeader, Grid, Pagination, TextField } from '@mui/material'

import { useDeletePostMutation, useFetchPublishedPostsQuery, useSearchPostsMutation } from 'src/store/query/postApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'
import Swal from 'sweetalert2'
import PostListTable from 'src/views/apps/post/list/PostListTable'
import FilterModal from 'src/views/apps/post/list/FilterModal'

const PublishedPost = () => {
  // ** State

  const [page, setPage] = useState<number>(1)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  // ** Hooks
  const [
    searchPosts,
    {
      // isFetching: isFetchingSearchPosts,
      data: searchPost
    }
  ] = useSearchPostsMutation()

  const { isFetching, isError, error, data: posts } = useFetchPublishedPostsQuery(page)

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
  } else if (isError) {
    showErrorAlert({ error: error })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Published Posts' />

          {/* <TableHeader /> */}
          <Box
            justifyItems={'center'}
            alignItems={'center'} // Add this line to vertically center-align the items
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

            <FilterModal />
          </Box>
          <PostListTable
            isFetching={isFetching}
            posts={searchPost ? searchPost : posts && posts.postings?.length > 0 ? posts.postings : []}
            page={page}
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

export default PublishedPost
