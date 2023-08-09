import { Card, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useRouter } from 'next/router'
import { useFetchPostDetailsQuery } from 'src/store/query/postApi'

const PostDetailsPage = () => {
  //States

  //Hooks
  const { postId } = useRouter().query
  const { isLoading, isError, error, data: postDetails } = useFetchPostDetailsQuery(postId as string)

  //Functions

  if (isLoading) {
    return 'Loading...'
  } else if (isError) {
    console.log('error', error)
  } else if (postDetails) {
    console.log('postDetails', postDetails)
  }

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
            <Typography>{postDetails ? postDetails.body : 'Empty'}</Typography>
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
