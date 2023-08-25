// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import { Card, CardContent, CardHeader, Grid, Pagination } from '@mui/material'

import { useDeletePostMutation, useFetchScheduledPostsQuery, useSearchPostsMutation } from 'src/store/query/postApi'
import { showErrorAlert, showLoadingAlert, showSuccessAlert } from 'src/utils/swal'
import Swal from 'sweetalert2'
import PostListTable from 'src/views/apps/post/list/PostListTable'
import { Post } from 'src/types/apps/postSchema'
import TableHeader from 'src/views/apps/post/list/TableHeader'

const PublishedPost = () => {
  // ** State

  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<Post[]>([])
  const [nowShowing, setNowShowing] = useState<'pagePosts' | 'searchPosts' | 'filteredPosts'>('pagePosts')

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  // ** Hooks
  const [searchPosts, { data: searchPost }] = useSearchPostsMutation()

  const { isFetching, isError, error, data: posts } = useFetchScheduledPostsQuery(page)

  const [
    deletePost,
    { isLoading: isLoadingDeletePost, isError: isDeletePostError, error: deletePostError, data: deletePostData }
  ] = useDeletePostMutation()

  // ** Functions

  const showDeleteConfirmationPopup = (postId: string) => {
    Swal.fire({
      title: `Do you really want to delete this post?`,
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      denyButtonText: `Cancel`
    }).then(result => {
      if (result.isConfirmed) {
        deletePost(postId)
      }
    })
  }

  const handlePostDelete = (postId: string) => {
    console.log('postId', postId)
    showDeleteConfirmationPopup(postId)
  }

  useEffect(() => {
    if (posts) {
      setNowShowing('pagePosts')
      setPostList(posts.postings)
    }
    if (searchPost) {
      setPage(1)
      setNowShowing('searchPosts')
      setPostList(searchPost)
    }
  }, [searchPost, posts])

  useEffect(() => {
    if (isLoadingDeletePost) {
      showLoadingAlert()
    } else if (isDeletePostError) {
      showErrorAlert({ error: deletePostError })
    } else if (deletePostData) {
      showSuccessAlert({ text: 'Post Deleted' })
    } else if (isError) {
      showErrorAlert({ error: error })
    }
  }, [isLoadingDeletePost, isDeletePostError, deletePostData, isError])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Scheduled Posts' />

          <TableHeader
            setPostList={setPostList}
            setNowShowing={setNowShowing}
            setPage={setPage}
            searchPosts={searchPosts}
          />

          <PostListTable isFetching={isFetching} posts={postList} page={page} handlePostDelete={handlePostDelete} />

          {nowShowing === 'pagePosts' ? (
            <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={posts ? Math.ceil(posts.info.totalNumberOfPostings / 10) : 1}
                page={page}
                onChange={handleChange}
              />
            </CardContent>
          ) : null}
        </Card>
      </Grid>
    </Grid>
  )
}

export default PublishedPost
