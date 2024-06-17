import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import CreatePost from "./components/CreatePostCard";
import { useSelector } from "react-redux";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
	
	const { currentUser, user } = useSelector(state => state.auth);
   
	return (
		<Flex w={"100vw"} >
			<Container maxW={"620px"} minH={"100vh"}>
				<Header />
				<Routes>
					<Route path='/' element={currentUser ? <HomePage /> : <Navigate to='/auth' />} />
					<Route path='/auth' element={!currentUser ? <AuthPage /> : <Navigate to='/' />} />
					<Route path='/update' element={currentUser ? <UpdateProfilePage /> : <Navigate to='/auth' />} />

					<Route
						path='/:username'
						element={
						 (
								<UserPage />
							)
						}
					/>
					<Route path='/:username/post/:pid' element={<PostPage />} />
					<Route path='/chat' element={currentUser ? <ChatPage /> : <Navigate to={"/auth"} />} />
					<Route path='/settings' element={currentUser ? <SettingsPage /> : <Navigate to={"/auth"} />} />
				</Routes>

			</Container>
		</Flex>
	);
};


export default App;