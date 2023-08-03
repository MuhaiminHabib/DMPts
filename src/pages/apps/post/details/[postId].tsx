import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import TypedRegistry from 'chart.js/dist/core/core.typedRegistry'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useFetchPostDetailsQuery } from 'src/store/query/postApi'
import { Post } from 'src/types/apps/postSchema'

const PostDetailsPage = () => {
  //States

  //Hooks
  const { postId } = useRouter().query
  const { isLoading, isError, error, data: postDetails } = useFetchPostDetailsQuery(postId as string)

  //Functions

  //   useEffect(() => {
  //     if (postDetails) {
  //       console.log('postDetails is', postDetails)
  //     }
  //   }, [postDetails])

  if (isLoading) {
    console.log('loading....')
  } else if (isError) {
    console.log('error', error)
  } else
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Post Details</Typography>
              <Typography>Post Details</Typography>
            </CardContent>
            <CardContent>
              <Typography>Post Body</Typography>
              <Typography>{postDetails.body}</Typography>
            </CardContent>
            <CardContent>
              <Typography>File</Typography>
              <Typography>test file.jpg</Typography>
            </CardContent>
            <CardContent>
              <Typography>Boost 1</Typography>
              <Box>
                <Typography>Start Date: June 1 2023</Typography>
                <Typography>End Date: June 10 2023</Typography>
                <Typography>Budget: $50</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
}

export default PostDetailsPage
