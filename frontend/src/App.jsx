import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
     <Flex   w={"100vw"} >
      <Container maxW={"620px"} minH={"100vh"}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/auth" element={<AuthPage />}/>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/post/:pid" element={<PostPage />} />
        </Routes>
      </Container>
      </Flex>
  );
};

export default App;
