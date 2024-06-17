import React, { useEffect } from 'react'
import UserHeader from '../components/UserHeader';
import { fetchUser } from '../state/actions/userActions';
import { fetchPosts } from '../state/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { useParams } from 'react-router-dom';
import { Flex, Heading, Spinner } from '@chakra-ui/react';
import CreatePost from '../components/CreatePostCard';

const UserPage = () => {
  const { currentUser } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.auth);
  const { userPosts, postLoading, postError } = useSelector(state => state.post);
  const { username } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(username));
    dispatch(fetchPosts(username));
  }, [username]);


  if (postLoading) {
    return (
      <Flex justifyContent={"center"} mt={4}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (postError) {
    return <Heading as="h1" color="red.500">Error loading data</Heading>;
  }

  if (!user) {
    return <Heading as="h1">User not found</Heading>;
  }


  return (
    <>
      <UserHeader user={user} />
      {
        userPosts ? userPosts.map((post) => <Post key={post._id} post={post} />) : <Heading>No Posts Please create first</Heading>
      }
      {
        currentUser?._id === user?._id && <CreatePost />
      }
    </>
  )
}

export default UserPage;