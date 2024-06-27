import { Box, Container, Spinner } from "@chakra-ui/react";
import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";

// Lazy loading the pages
const HomePage = lazy(() => import("./pages/HomePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const UpdateProfilePage = lazy(() => import("./pages/UpdateProfilePage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));

const App = () => {
	const { currentUser } = useSelector(state => state.auth);

	return (
		<Box position={"relative"} w={"full"}>
			<Container maxW={"620px"} minH={"100vh"}>
				<Header />
				<Suspense fallback={<Flex justifyContent={"center"} mt={4}>
					<Spinner size={"2xl"} />
				</Flex>}>
					<Routes>
						<Route path='/' element={currentUser ? <HomePage /> : <Navigate to='/auth' />} />
						<Route path='/auth' element={!currentUser ? <AuthPage /> : <Navigate to='/' />} />
						<Route path='/update' element={currentUser ? <UpdateProfilePage /> : <Navigate to='/auth' />} />
						<Route path='/:username' element={<UserPage />} />
						<Route path='/:username/post/:pid' element={<PostPage />} />
						<Route path='/chat' element={currentUser ? <ChatPage /> : <Navigate to={"/auth"} />} />
						<Route path='/settings' element={currentUser ? <SettingsPage /> : <Navigate to={"/auth"} />} />
					</Routes>
				</Suspense>
			</Container>
		</Box>
	);
};

export default App;
