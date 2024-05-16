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
} from "@chakra-ui/react";

export default function Login({setIsLogin, isLogin}) {

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
      });
    
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
            >
              Sign in
            </Button>
          </Stack>
          <Stack pt={6}>
                <Text align={'center'}>
                  Not have an account? <Link color={useColorModeValue("gray.600", "gray.700")}  _hover={{
                color: useColorModeValue("gray.700", "gray.1000"),
              }} onClick={(e)=>setIsLogin(!isLogin)}>Signup</Link>
                </Text>
              </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
