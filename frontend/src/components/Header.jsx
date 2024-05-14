import { Flex, Image, useColorMode } from "@chakra-ui/react";
import React from "react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} my={2}>
      <Image
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        alt="logo"
        onClick={()=>toggleColorMode()}
        cursor={"pointer"}
      />
    </Flex>
  );
};

export default Header;
