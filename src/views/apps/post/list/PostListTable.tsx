import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { Post } from 'src/types/apps/postSchema'
import Loader from 'src/shared-components/Loader'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { convertToFormattedLocalDateTime } from 'src/utils/helperFunctions'

type inputProps = {
  isFetching: boolean
  posts: Post[]
  page: number
  handlePostDelete: (postId: string) => void
}

const PostListTable = ({ isFetching, posts, page, handlePostDelete }: inputProps) => {
  // **States

  // **Hooks
  // const router = useRouter()

  // Access the route
  // const currentRoute = router.pathname

  const ability = useContext(AbilityContext)

  // **Functions

  if (posts) {
    console.log('posts are la alala', posts)
  }

  return (
    <TableContainer component={Paper}>
      {isFetching ? (
        <Loader />
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>#</TableCell>
              <TableCell align='left'>Publish Date</TableCell>
              <TableCell align='left'>Publish Time</TableCell>
              <TableCell align='left'>Post Body</TableCell>
              <TableCell align='center'>Platform</TableCell>
              <TableCell align='center'>Client</TableCell>
              <TableCell align='center'>Page</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts && posts.length > 0
              ? posts.map((post, i) => (
                  <TableRow
                    key={post._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell>{(page - 1) * 10 + i + 1}</TableCell>

                    {/* {currentRoute.toString().includes('scheduled') ? (
                      <>
                        <TableCell>{convertToFormattedLocalDateTime(post.scheduledDate, 'date')}</TableCell>
                        <TableCell>{convertToFormattedLocalDateTime(post.scheduledDate, 'time')}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{convertToFormattedLocalDateTime(post.postingDate, 'date')}</TableCell>
                        <TableCell>{convertToFormattedLocalDateTime(post.postingDate, 'time')}</TableCell>
                      </>
                    )} */}

                    <TableCell>
                      {convertToFormattedLocalDateTime(
                        post.scheduledDate ? post.scheduledDate : post.postingDate,
                        'date'
                      )}
                    </TableCell>
                    <TableCell>
                      {convertToFormattedLocalDateTime(
                        post.scheduledDate ? post.scheduledDate : post.postingDate,
                        'time'
                      )}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {post.body.length > 50 ? `${post.body.substring(0, 50)}...` : post.body}
                    </TableCell>
                    {typeof post.platform !== 'string'
                      ? post.platform.map((item, i) => (
                          <TableCell key={i} align='center' component='th' scope='row'>
                            {item.platform === 'fb' ? 'Facebook' : 'Unidentified'}
                          </TableCell>
                        ))
                      : 'Unknown'}

                    <TableCell align='center'>
                      {typeof post.client !== 'string' ? post.client.username : 'Unknown'}
                    </TableCell>
                    <TableCell align='center'>{post.fbPage ? post.fbPage.name : 'Unknown'}</TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Post Details' placement='top-start'>
                        {/* <PostDetailsModal post={post} /> */}
                        {/* <DetailsPage /> */}
                        <a href={`/apps/post/details/${post._id}`} style={{ marginRight: '.5rem' }}>
                          <MenuBookIcon color='primary' />
                        </a>
                      </Tooltip>

                      {ability?.can('read', 'delete-post') ? (
                        <Tooltip title='Post Delete' placement='top-start'>
                          <a onClick={() => handlePostDelete(post._id!)}>
                            <DeleteForeverIcon color='error' />
                          </a>
                        </Tooltip>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))
              : 'No Posts to show'}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  )
}

export default PostListTable
