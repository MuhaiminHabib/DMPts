import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import PostDetailsModal from '../view/PostDetailsModal'
import EditPostModal from '../edit/EditPostModal'
import { Post } from 'src/types/apps/postSchema'
import Loader from 'src/shared-components/Loader'
import { AbilityContext } from 'src/layouts/components/acl/Can'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

type inputProps = {
  isFetching: boolean
  posts: Post[]
  handlePostDelete: (postId: string, title: string) => void
}

const PostListTable = ({ isFetching, posts, handlePostDelete }: inputProps) => {
  // **States

  // **Hooks

  const ability = useContext(AbilityContext)

  // **Functions

  if (posts) {
    console.log('posts are', posts)
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
              <TableCell align='center'>Title</TableCell>
              <TableCell align='center'>Platform</TableCell>
              <TableCell align='center'>Client</TableCell>
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
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>June 1 2023</TableCell>
                    <TableCell>4pm EST</TableCell>
                    <TableCell align='center' component='th' scope='row'>
                      {post.title}
                    </TableCell>
                    <TableCell align='center' component='th' scope='row'>
                      Facebook
                    </TableCell>

                    <TableCell align='center'>Test Client Name</TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Post Details' placement='top-start'>
                        <PostDetailsModal post={post} />
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
