import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import { Post } from 'src/types/apps/postSchema'
import Loader from 'src/shared-components/Loader'
import { AbilityContext } from 'src/layouts/components/acl/Can'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PostDetailsModal from '../view/PostDetailsModal'

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

  const getFormattedDate = (timestamp: string): string => {
    const dateTime = new Date(timestamp)

    // Create an array of month names
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    // Extract the date components
    const year = dateTime.getUTCFullYear()
    const monthIndex = dateTime.getUTCMonth()
    const day = dateTime.getUTCDate()

    // Get the month name from the array
    const monthName = monthNames[monthIndex]

    // Return the formatted date string in the format "June 1, 2023"
    return `${monthName} ${day}, ${year}`
  }

  const getFormattedTime = (timestamp: string): string => {
    const dateTime = new Date(timestamp)

    // Adjust hours for EST (Eastern Standard Time)
    const estOffset = -5 // EST is UTC-5
    const estHours = (dateTime.getUTCHours() + estOffset + 24) % 12 || 12

    // Extract the minutes component
    const minutes = dateTime.getUTCMinutes()

    // Determine AM or PM
    const ampm = dateTime.getUTCHours() >= 12 ? 'PM' : 'AM'

    // Return the formatted time string in the format "4:10 PM"
    return `${estHours}:${String(minutes).padStart(2, '0')} ${ampm}`
  }

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
                    <TableCell>{getFormattedDate(post.postingDate)}</TableCell>
                    <TableCell>{getFormattedTime(post.postingDate)}</TableCell>
                    <TableCell align='center' component='th' scope='row'>
                      {post.body.length > 50 ? `${post.body.substring(0, 50)}...` : post.body}
                    </TableCell>
                    {typeof post.platform !== 'string'
                      ? post.platform.map(item => (
                          <TableCell align='center' component='th' scope='row'>
                            {item.platform === 'fb' ? 'Facebook' : 'Unidentifid'}
                          </TableCell>
                        ))
                      : 'Unknown'}

                    <TableCell align='center'>
                      {typeof post.client !== 'string' ? post.client.username : 'Unknown'}
                    </TableCell>
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
