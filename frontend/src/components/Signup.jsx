import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import useShowToast from "../hooks/useShowToast.js";
import { validateSignUpData } from "../utils/validateFormData.js";
import { useDispatch } from "react-redux";
import { setAuthState } from "../state/slices/authSlice.js";

export default function Signup({ setIsLogin, isLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch=useDispatch()
  const showToast = useShowToast();
  async function handleSignup() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      let errordata = validateSignUpData(inputs);
      if (errordata) {
        showToast("Error", errordata, "error");
        return;
      }
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name:inputs.name, email:inputs.email, password:inputs.password, username:inputs.username})
      });
      const data =await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return ;
      }
      showToast("Success", data.message, "success");
      dispatch(setAuthState("login"));
    } catch (error) {
      console.log(error);
      showToast("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.dark")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <HStack>
            <Box>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  onChange={(e) =>
                    setInputs({ ...inputs, name: e.target.value })
                  }
                  value={inputs.name}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text"
                  onChange={(e) =>
                    setInputs({ ...inputs, username: e.target.value })
                  }
                  value={inputs.username}
                />
              </FormControl>
            </Box>
          </HStack>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email"
              onChange={(e) =>
                setInputs({ ...inputs, email: e.target.value })
              }
              value={inputs.email}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setInputs({ ...inputs, password: e.target.value })
                }
                value={inputs.password}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>ConfirmPassword</FormLabel>
            <InputGroup>
              <Input type={showPassword1 ? "text" : "password"}
                onChange={(e) =>
                  setInputs({ ...inputs, confirmPassword: e.target.value })
                }
                value={inputs.confirmPassword}
              />
              <InputRightElement h={"full"}>
                <Button
                  variant={"ghost"}
                  onClick={() =>
                    setShowPassword1((showPassword1) => !showPassword1)
                  }
                >
                  {showPassword1 ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={useColorModeValue("gray.600", "gray.700")}
              color={"white"}
              _hover={{
                bg: useColorModeValue("gray.700", "gray.800"),
              }}
              isLoading={isLoading}
              onClick={handleSignup}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link
                color={useColorModeValue("gray.600", "gray.700")}
                _hover={{
                  color: useColorModeValue("gray.700", "gray.1000"),
                }}
                onClick={(e) => dispatch(setAuthState("login"))}
              >
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}