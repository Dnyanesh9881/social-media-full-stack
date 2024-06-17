import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Checkbox,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { validateLoginData } from "../utils/validateFormData";
import useShowToast from "../hooks/useShowToast";
import { setAuthState, setCurrentUser } from "../state/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const showToast = useShowToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  async function handleLogin() {
    if (loginLoading) return;
    setLoginLoading(true);
    try {
      let errordata = validateLoginData({loginId:inputs.username, password:inputs.password});
      if (errordata) {
        showToast("Error", errordata, "error");
        return;
      }
      const res = await fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
				showToast("Success", "login Successsfully", "success");
      console.log(data);
			 dispatch(setCurrentUser(data));
       navigate("/");
       localStorage.setItem("User", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      showToast("Error", error.message, "error");

    } finally {
      setLoginLoading(false);
    }
  }

  return (

    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"}>Sign in</Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.dark")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              value={inputs.username}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              value={inputs.password}
            />
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Link color={"blue.400"}>Forgot password?</Link>
            </Stack>
            <Button
              bg={useColorModeValue("gray.600", "gray.700")}
              color={"white"}
              _hover={{
                bg: useColorModeValue("gray.700", "gray.800"),
              }}
              onClick={handleLogin}
              isLoading={loginLoading}
            >
              Sign in
            </Button>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Not have an account? <Link color={useColorModeValue("gray.600", "gray.700")} _hover={{
                color: useColorModeValue("gray.700", "gray.1000"),
              }} onClick={(e) => dispatch(setAuthState("signup"))}>Signup</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}