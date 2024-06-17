import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followUnfollowUser } from "../state/slices/authSlice";

const UserHeader = ({ user }) => {
  const { currentUser } = useSelector(state => state.auth);
  // const {user} = useSelector(state =>state.auth)
  const [follow, setFollow] = useState(() => currentUser?.following.includes(user._id))
  const showToast = useShowToast();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  function copyUrl() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      console.log("URl copied to clipboard");
      showToast("Sucess", "Profile link copied", "sucess");
    });
  }
  const handleFollowUnfollow = async () => {
    if(!currentUser){
      showToast("Error", "To Follow please login first");
      return ;
    }
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST"
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
      }

      showToast("Success", data.message, "success");
      dispatch(followUnfollowUser(user.Id));
      setFollow(!follow);
    } catch (error) {
      showToast("Error", error, "error");
    }
  }

  return (
    <VStack gap={4} alignItems={"start"} mt={8}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"md"}>{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={"#616161"}
              color={"#101010"}
              borderRadius={"full"}
              p={1}
            >
              EchoSphere.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="Mark Zuckerberg"
            src={user.profilePic}
            size={"xl"}
            borderRadius={"50%"}
          />
        </Box>
      </Flex>
      {
        currentUser?._id === user._id && <Button onClick={() => navigate("/update")}bg={useColorModeValue("gray.300", "gray.dark")} >Profile </Button>
      }
      {
          currentUser?._id !== user._id && <Button  bg={useColorModeValue("gray.300", "gray.dark")} onClick={handleFollowUnfollow} >{!currentUser ? "Follow" : (!follow ? "Follow" : "Unfollow")}</Button>
      }
      <Text my={2} fontSize={"xl"}>
        {user.bio}
      </Text>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex gap={1} alignItems={"center"}>
          <Text color={"#616161"}>{user.follower.length}</Text>
          <Box bg={"#616161"} w={1} h={1} borderRadius={"50%"}></Box>
          <Text color={"#616161"}>instagram.com</Text>
        </Flex>
        <Flex gap={4}>
          <Box borderRadius={"50%"} cursor={"pointer"}>
            <BsInstagram size={26} />
          </Box>
          <Box borderRadius={"50%"} cursor={"pointer"}>
            <Menu>
              <MenuButton border={"none"}>
                <CgMoreO size={26} _hover={{ bg: "#616161" }} />
              </MenuButton>
              <Portal>
                <MenuList bg={"#1e1e1e"}>
                  <MenuItem bg={"#1e1e1e"} onClick={copyUrl}>
                    copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"} p={2} alignItems={"center"}>
        <Flex flex={1} justifyContent={"center"} borderBottom={"2px solid white"} py={3}><Text fontWeight={"bold"}>Threads</Text></Flex>
        <Flex flex={1} color={"#616161"} justifyContent={"center"} borderBottom={"1px solid #616161"} py={3}><Text fontWeight={"bold"}>Replies</Text></Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;