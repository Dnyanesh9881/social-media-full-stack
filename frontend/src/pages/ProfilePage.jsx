import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";

const ProfilePage = () => {

    const [input, setInput]=useState({
        
    })
  return (
    <from on>
        <Flex justifyContent={"center"}>
    <Stack
      spacing={4}
      w={"full"}
      maxW={"md"}
      bg={useColorModeValue("white", "gray.dark")}
      rounded={"xl"}
      boxShadow={"lg"}
      p={6}
      my={12}
    >
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        User Profile Edit
      </Heading>
      <FormControl >
        <FormLabel>User Icon</FormLabel>
        <Stack direction={["column", "row"]} spacing={6}>
          <Avatar size="xl" src="https://bit.ly/sage-adebayo"></Avatar>

          <Center w="full">
            <Button w="full" bg={useColorModeValue("gray.300", "gray.light")}>Change Icon</Button>
          </Center>
        </Stack>
      </FormControl>
      
      <FormControl  >
        <FormLabel>Full Name</FormLabel>
        <Input
          placeholder="John Doe"
          _placeholder={{ color: "gray.500" }}
          type="text"
        />
      </FormControl>
      <FormControl id="userName" >
        <FormLabel>User name</FormLabel>
        <Input
          placeholder="johndoe"
          _placeholder={{ color: "gray.500" }}
          type="text"
        />
      </FormControl>
      <FormControl id="email" >
        <FormLabel>Email address</FormLabel>
        <Input
          placeholder="your-email@example.com"
          _placeholder={{ color: "gray.500" }}
          type="email"
        />
      </FormControl>
      <FormControl id="userName" >
        <FormLabel>Bio</FormLabel>
        <Input
          placeholder="Your Bio..."
          _placeholder={{ color: "gray.500" }}
          type="text"
        />
      </FormControl>
      <FormControl id="password" >
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="password"
          _placeholder={{ color: "gray.500" }}
          type="password"
        />
      </FormControl>
      <Stack spacing={6} direction={["column", "row"]}>
        <Button
          bg={"red.400"}
          color={"white"}
          w="full"
          _hover={{
            bg: "red.500",
          }}
        >
          Cancel
        </Button>
        <Button
          bg={"blue.400"}
          color={"white"}
          w="full"
          _hover={{
            bg: "blue.500",
          }}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
    </Flex>
    </from>
  );
};
export default ProfilePage;
