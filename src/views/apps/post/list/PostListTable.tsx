import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material'
import React, { useContext, useState } from 'react'
import PostDetailsModal from '../view/PostDetailsModal'
import EditPostModal from '../edit/EditPostModal'
import { PostsTypes as Posts } from 'src/types/apps/postTypes'
import Loader from 'src/shared-components/Loader'
import { AbilityContext } from 'src/layouts/components/acl/Can'
import TableHeader from './TableHeader'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type inputProps = {
    isLoading: boolean,
    posts: Posts[],
    handlePostDelete: Function,

}


const PostListTable = ({isLoading, posts, handlePostDelete}: inputProps) => {
    // **States
    const [addPostOpen, setAddPostOpen] = useState<boolean>(false)
    // **Hooks
    const ability = useContext(AbilityContext)

    // **Functions
    const toggleAddPostDrawer = () => setAddPostOpen(!addPostOpen)

  return (
    <TableContainer component={Paper}>
          {isLoading  ? <Loader /> : 
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
              {ability?.can('read', 'add-post') ? (<TableHeader toggle={toggleAddPostDrawer} />) : null}
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align='right'>Client</TableCell>
                  <TableCell align='right'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(posts && posts.length > 0) ? posts.map((post, i) => (
                  <TableRow
                    key={post._id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 }
                    }}>
                      <TableCell>{i + 1}</TableCell>
                    <TableCell component='th' scope='row'>
                      {post.title}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {post.description}
                    </TableCell>

                    <TableCell align='right'>{post.creator.username}</TableCell> 
                    <TableCell align='right'>
                      <Tooltip title='Post Details' placement='top-start'>
                        <PostDetailsModal post={post}/>
                      </Tooltip>

                      {ability?.can('read', 'edit-post') ? <Tooltip title='Post Edit' placement='top-start'>
                        <EditPostModal post={post}/>
                      </Tooltip> : null}
                      
                      {ability?.can('read', 'delete-post') ? 
                      <Tooltip title='Post Delete' placement='top-start'>
                        <Button startIcon={<DeleteForeverIcon />} 
                        onClick={() => handlePostDelete(post._id, post.title)}
                        ></Button>
                      </Tooltip>
                       : null}
                    </TableCell>
                  </TableRow>
                )) 
                : "No Posts to show"}
              </TableBody>
            </Table>}
          </TableContainer>
  )
}

export default PostListTable