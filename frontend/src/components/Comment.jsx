import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = ({reply}) => {
    const [liked, setLiked]=useState(false);
  return (
    <>
    <Flex gap={4}>
      <Avatar
        size={"md"}
        name="john doe"
        src={reply.avatar}
        padding={"2px"}
      />
      <Flex flexDirection={"column"} w={"full"} gap={3}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Text>{reply.username}</Text>
          <Flex alignItems={"center"} gap={3}>
            <Text color={"#616161"}>{reply.createdAt}</Text>
            <Box>
              <BsThreeDots />
            </Box>
          </Flex>
        </Flex>
        <Text>{reply.text}</Text>
        
        {/* <Actions liked={liked} setLiked={setLiked}/> */}
        {/* <Text color={"gray.light"}>{reply.likes.length +(liked ? 1 : 0)}</Text> */}
      </Flex>

    </Flex>
    <Divider color={"gray.light"} my={4}/>
    </>
  );
};

export default Comment;