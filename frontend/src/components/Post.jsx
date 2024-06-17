import { Avatar, Box, Center, Divider, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useDispatch, useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons"
import useShowToast from "../hooks/useShowToast";
import { deletePost } from "../state/slices/postSlice";

const Post = ({ post }) => {
  const { currentUser } = useSelector(state => state.auth);
  const [user, setUser] = useState(null);
  const showToast=useShowToast();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + post.postedBy);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };
    getUser();
  }, [post]);
  
  const handleDeletePost = async (e) => {
		try {
			e.preventDefault();
			if (!window.confirm("Are you sure you want to delete this post?")) return;

			const res = await fetch("/api/post/delete", {
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
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	if (!user) return null;
  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={4} mt={5}>
        <Flex flexDirection={"column"} gap={2} alignItems={"center"}>
          <Avatar size={"md"} name={user.name} src={user.profilePic} onClick={(e)=>{
            e.preventDefault();
            navigate(`/${user.username}`)
          }}/>
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"} mb={5}>
          {post.replies.length===0 && <Text >🥱</Text>}
          {post.replies[0]&& 
           <Avatar
           size={"xs"}
           name={post.replies[0].username}
           src={post.replies[0].userProfilePic}
           position={"absolute"}
           top={"0px"}
           left={"0"}
           padding={"2px"}
         />
         }
         {post.replies[1]&& 
           <Avatar
           size={"xs"}
           name={post.replies[1].username}
           src={post.replies[1].userProfilePic}
           position={"absolute"}
              top={"0px"}
              left={"6"}
              padding={"2px"}
         />
         }
         {post.replies[2]&& 
           <Avatar
           size={"xs"}
           name={post.replies[2].username}
           src={post.replies[2].userProfilePic}
           position={"absolute"}
              top={"5"}
              left={"3"}
              padding={"2px"}
         />
         }
          </Box>
        </Flex>
        <Flex w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"start"}
            mb={2}
          >
            <Flex alignItems={"center"} gap={2}>
              <Text fontWeight={"bold"} fontSize={"md"}
              onClick={(e)=>{
                e.preventDefault();
                navigate(`/${user.username}`)
              }}>
                {user.username}
              </Text>
              <Box>
                <Image w={4} src="/verified.png" />
              </Box>
            </Flex>
            <Flex alignItems={"center"} gap={3}>
              <Text fontSize={"xs"} color={"#616161"}>{formatDistanceToNow(new Date(post.createdAt))}ago</Text>
              {
                currentUser?._id === user._id && <DeleteIcon size={20} onClick={handleDeletePost} />
              }
             
            </Flex>
          </Flex>
          <Text my={4}>{post.text}</Text>
          {post.img && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid #616161"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}
          <Flex my={3}>
            <Actions post={post} />
          </Flex>
        
        </Flex>
      </Flex>
      <Divider color={"gray.light"} mt={8} />
    </Link>
  );
};

export default Post;