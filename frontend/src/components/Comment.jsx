import { Avatar, Box, Divider, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

const Comment = ({username, comment, createdAt, avatar, likes}) => {
    const [liked, setLiked]=useState(false);
  return (
    <>
    <Flex gap={4}>
      <Avatar
        size={"md"}
        name="john doe"
        src={avatar}
        padding={"2px"}
      />
      <Flex flexDirection={"column"} w={"full"} gap={3}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Text>{username}</Text>
          <Flex alignItems={"center"} gap={3}>
            <Text color={"#616161"}>{createdAt}</Text>
            <Box>
              <BsThreeDots />
            </Box>
          </Flex>
        </Flex>
        <Text>{comment}</Text>
        
        <Actions liked={liked} setLiked={setLiked}/>
        <Text color={"gray.light"}>{likes +(liked ? 1 : 0)}</Text>
      </Flex>

    </Flex>
    <Divider color={"gray.light"} my={4}/>
    </>
  );
};

export default Comment;
