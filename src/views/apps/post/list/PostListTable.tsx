import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
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
  handlePostDelete: (postId: string, title: string) => void
}

const PostListTable = ({ isFetching, posts, page, handlePostDelete }: inputProps) => {
  // **States

  // **Hooks

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
              <TableCell align='left'>Index</TableCell>
              <TableCell align='left'>Date</TableCell>
              <TableCell align='left'>Time</TableCell>
              <TableCell align='center'>Post Body</TableCell>
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
                    <TableCell>{convertToFormattedLocalDateTime(post.postingDate, 'date')}</TableCell>
                    <TableCell>{convertToFormattedLocalDateTime(post.postingDate, 'time')}</TableCell>
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
                    <TableCell align='center'>{post.fbPage.name}</TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Post Details' placement='top-start'>
                        {/* <PostDetailsModal post={post} /> */}
                        {/* <DetailsPage /> */}
                        <Button startIcon={<MenuBookIcon />} href={`/apps/post/details/${post._id}`}></Button>
                      </Tooltip>

                      {ability?.can('read', 'delete-post') ? (
                        <Tooltip title='Post Delete' placement='top-start'>
                          <Button
                            startIcon={<DeleteForeverIcon />}
                            onClick={() => handlePostDelete(post._id!, post.title)}
                          ></Button>
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
