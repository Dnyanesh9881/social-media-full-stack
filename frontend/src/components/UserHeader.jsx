import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {
  const toast=useToast()
  function copyUrl() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      console.log("URl copied to clipboard");
      toast({
        description: "Profile link copied",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })    });
  }
  return (
    <VStack gap={4} alignItems={"start"} mt={8}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Mark Zuckerberg
          </Text>
          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"md"}>zuckerberg</Text>
            <Text
              fontSize={"sm"}
              bg={"#616161"}
              color={"#101010"}
              borderRadius={"full"}
              p={1}
            >
              thread.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="Mark Zuckerberg"
            src="/zuck-avatar.png"
            size={"xl"}
            borderRadius={"50%"}
          />
        </Box>
      </Flex>
      <Text my={2} fontSize={"xl"}>
        Co-founder, executive chairman and CEO of Meta Platform.
      </Text>
      <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
        <Flex gap={1} alignItems={"center"}>
          <Text color={"#616161"}>3.2K followers</Text>
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
