import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";

const PostPage = ({ likes, replies }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex w={"full"} mt={8}>
        <Flex alignItems={"center"} gap={3} w={"full"}>
          <Avatar size={"md"} name="Mark Zuckerberge" src="/zuck-avatar.png" />
          <Flex alignItems={"center"} gap={2}>
            <Text fontWeight={"bold"} fontSize={"md"}>
              markzuckerberge
            </Text>
            <Box>
              <Image w={4} src="/verified.png" />
            </Box>
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={3}>
          <Text color={"#616161"}>1d</Text>
          <Box>
            <BsThreeDots />
          </Box>
        </Flex>
      </Flex>
      <Text py={3}>This is my first post</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid #616161"}>
        <Image src="/post1.png" w={"full"} />
      </Box>
      <Flex py={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize="sm">
          {replies} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize="sm">
          {likes} likes
        </Text>
      </Flex>
      <Divider color={"gray.light"} my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex alignItems={"center"} gap={3}>
          <Text fontSize={"x-large"}>👋</Text>
          <Text>Get the app to like, reply and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider color={"gray.light"} my={4} />
      <Comment
        comment="Looks really Good"
        createdAt="2d"
        likes={100}
        username="johndoe"
        avatar="https://bit.ly/sage-adebayo"
      />
      <Comment
        comment="Looks really Good"
        createdAt="d"
        likes={16}
        username="johcena"
        avatar="https://bit.ly/kent-c-dodds"
      />
      <Comment
        comment="Looks really Good"
        createdAt="5d"
        likes={56}
        username="viviek"
        avatar="https://bit.ly/dan-abramov"
      />
    </>
  );
};

export default PostPage;
