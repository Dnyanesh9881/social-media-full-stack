import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds } from "../state/actions/postActions";
import Post from "../components/Post";

const HomePage = () => {
  const { currentUser } = useSelector(state => state.auth);
  const { feedPosts, feedLoading } = useSelector(state => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);
  if (feedLoading) {
    return (
    <Flex justifyContent={"center"}>
      <Spinner size={"xl"}></Spinner>
      </Flex>)
  }
  if(feedPosts.length===0){
    return(<Heading>Follow some users to see the feed</Heading>)
  }
  return (
    <Box>
      {
        feedPosts.map((post)=> <Post key={post._id} post={post} />)
      }
    </Box>
  );
};

export default HomePage;