import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../state/actions/userActions";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { deletePost } from "../state/slices/postSlice";

const PostPage = () => {
  const {currentUser}=useSelector(state=>state.auth);
  const [post, setPost] = useState(null);
  const { pid } = useParams();
  const { user, userLoading } = useSelector(state => state.auth);
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const showToast = useShowToast();

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/post/${pid}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        console.log(data);
        setPost(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      }
      finally {
        setLoading(false);
      }
    };
    dispatch(fetchUser(username));
    getPost();
  }, [pid,username,setPost]);

  const handleDeletePost=async()=>{
    try {
		
			if (!window.confirm("Are you sure you want to delete this post?")) return;

			const res = await fetch(`/api/post/delete`, {
				method: "DELETE",
        headers:{
          "Content-Type": "application/json"
          },
          body:JSON.stringify({postId:post._id})
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post deleted", "success");
			dispatch(deletePost(post._id));
      Navigate(`/${username}`);
		} catch (error) {
			showToast("Error", error.message, "error");
		}
  }

  if (userLoading || loading) {
    return (
      <Flex justifyContent={"center"} mt={4}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }

  if (!post) {
    return <p>Post not found</p>
  }
  
  return (
    <>
      <Flex w={"full"} mt={8}>
        <Flex alignItems={"center"} gap={3} w={"full"}>
          <Avatar size={"md"} name="Mark Zuckerberge" src={user.profilePic} />
          <Flex alignItems={"center"} gap={2}>
            <Text fontWeight={"bold"} fontSize={"md"}>
              {user.username}
            </Text>
            <Box>
              <Image w={4} src="/verified.png" />
            </Box>
          </Flex>
        </Flex>
        <Flex alignItems={"center"} gap={3} w={40}>
          <Text color={"#616161"} fontSize={"xs"}>{formatDistanceToNow(new Date(post.createdAt))} ago</Text>
          {
                currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />
          }
        </Flex>
      </Flex>
      <Text py={3}>{post.text}</Text>
      {post.img && <Box borderRadius={6} overflow={"hidden"} border={"1px solid #616161"}>
        <Image src={post.img} w={"full"} />
      </Box>}
      <Flex py={3}>
        <Actions post={post} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize="sm">
          {post.replies.length} replies
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize="sm">
          {post.likes.length} likes
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
      {
        post.replies.map((reply)=><Comment key={reply._id} reply={reply} />)
      }
    </>
  );
};

export default PostPage;