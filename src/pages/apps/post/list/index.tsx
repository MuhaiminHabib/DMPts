// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import {
  Box,
  Button,
  Card,
  CardHeader,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Diversity3Icon from '@mui/icons-material/Diversity3'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import axiosConfig from 'src/configs/axios'
import { UsersType } from 'src/types/apps/userTypes'
import Dialog from 'src/pages/components/dialogs'
import DialogRespoFullScreen from 'src/views/components/dialogs/DialogRespoFullScreen'
import PostDetailsModal from 'src/views/apps/post/view/PostDetailsModal'
import { Post } from 'src/types/apps/postTypes'



const InvoiceList = () => {
  // ** State
  const [posts, setPosts] = useState<Post[]>([])

  // ** Hooks
  useEffect(() => {
    handleFetchPosts()
  }, [])

  // ** Functions

  const handleFetchPosts = async () => {
    try {
      const res = await axiosConfig.get('/posting/page/1')
      console.log(res.data)
      setPosts(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>

        
        <Card>
          <Box bgcolor={'red'} justifyItems={'center'} alignItems={'center'}></Box>

          <CardHeader title='Posts' />
          {/* {showHeader ? <TableHeader toggle={toggleAddUserDrawer} /> : null} */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>

                  <TableCell align='right'>Creator</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map(post => (
                  <TableRow
                    key={post._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}
                  >
                    <TableCell component='th' scope='row'>
                      {post.title}
                    </TableCell>

                    <TableCell align='right'>{post.creator.username}</TableCell>
                    <TableCell align='right'>
                      <Tooltip title='Post Details' placement='top-start'>
                        <PostDetailsModal post={post}/>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Grid>

      {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
    </Grid>
  )
}

export default InvoiceList
