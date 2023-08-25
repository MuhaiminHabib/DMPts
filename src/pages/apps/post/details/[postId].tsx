import { Card, CardContent, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useFetchPostDetailsQuery } from 'src/store/query/postApi'
import Image from 'next/image'
import { convertToFormattedLocalDateTime } from 'src/utils/helperFunctions'

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
      <Grid item xs={12} md={8}>
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}> */}
        <Card sx={{ width: '100%', mb: 2, gridRow: 'span 10' }}>
          <CardContent sx={{ background: '#f5f5f9', mb: 2 }}>
            <Typography variant='h4'>Post Details</Typography>
            {/* <Typography>Post Details</Typography> */}
          </CardContent>

          <CardContent>
            <Typography sx={{ fontWeight: 'bold' }}>{postDetails.fbPage.name}</Typography>
            <Box sx={{ mt: -2, mb: 1.5 }}>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                {`${convertToFormattedLocalDateTime(postDetails.postingDate, 'date')} ${convertToFormattedLocalDateTime(
                  postDetails.postingDate,
                  'time'
                )}`}
              </Typography>
            </Box>
            <Typography>{postDetails ? postDetails.body : 'Empty'}</Typography>

            {postDetails.content && postDetails.content !== '' ? (
              <Image
                src={`https://www.saicoshop.com/API/images/${postDetails.content}`}
                alt='Description of the image'
                width={400}
                height={300}
              />
            ) : null}
          </CardContent>
          <CardContent>
            <Typography sx={{ fontWeight: 'bold', my: 3 }}>Boost 1</Typography>
            <Box>
              <Typography>Start Date: June 1 2023</Typography>
              <Typography>End Date: June 10 2023</Typography>
              <Typography>Budget: $50</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={{ width: '100%', mb: 2, gridRow: 'span 4' }}>
          <CardContent>
            <Box sx={{ mb: 4 }}>
              <Typography variant='h6' sx={{ pb: -2, mb: 2 }}>
                Post Links
              </Typography>
              <List>
                <ListItem sx={{ my: -2 }}>
                  <ListItemText>
                    <Link href={postDetails.fbUrl} target='_blank' rel='noopener'>
                      Facebook
                    </Link>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ my: -2 }}>
                  <ListItemText>
                    <Link href=''>Instagram</Link>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ my: -2 }}>
                  <ListItemText>
                    <Link href=''>Twitter</Link>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ my: -2 }}>
                  <ListItemText>
                    <Link href=''>Pinterest</Link>
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
            <Box>
              <Typography variant='h6' sx={{ pb: -2 }}>
                Boost this post
              </Typography>
              <List>
                <ListItem sx={{ my: -2 }}>
                  <ListItemText>
                    <Link href=''>Facebook</Link>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ my: -2 }}>
                  <ListItemText>
                    <Link href=''>Instagram</Link>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ my: -2 }}>
                  <ListItemText>
                    <Link href=''>Twitter</Link>
                  </ListItemText>
                </ListItem>
                <ListItem sx={{ my: -2 }}>
                  <ListItemText>
                    <Link href=''>Pinterest</Link>
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
          </CardContent>
        </Card>
        {/* </Box> */}
      </Grid>
    </Grid>
  )
}

export default PostDetailsPage
