import React from 'react'
import UserHeader from '../components/UserHeader';
import UserPost from '../components/UserPost';

const UserPage = () => {
  return (
   <>
   <UserHeader />
   <UserPost  postImg={"/post1.png"} postTitle={"This is my first post"} likes={"450"} replies={"123"}/>
   <UserPost  postImg={"/post3.png"} postTitle={"This is my first post"} likes={"450"} replies={"123"}/>
   <UserPost  postImg={"/post2.png"} postTitle={"This is my first post"} likes={"450"} replies={"123"}/>
   </>
  )
}

export default UserPage;