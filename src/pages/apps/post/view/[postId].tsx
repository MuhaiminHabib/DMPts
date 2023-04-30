import { useRouter } from 'next/router'
import React from 'react'

const PostDetails = () => {
  // states
  // hooks

  const {postId} = useRouter().query

  // functions
  return <div>PostDetails of {postId}</div>
}


export default PostDetails
