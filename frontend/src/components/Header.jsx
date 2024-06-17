import { Button, Flex, Image, Link, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../hooks/useLogout";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../state/slices/authSlice";

const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const logout = useLogout();
	const { currentUser } = useSelector(state => state.auth);
	const dispatch=useDispatch()

	return (
		<Flex justifyContent={"space-between"} position={"sticky"} top={"0"} bg={useColorModeValue("gray.light", "gray.dark")} p={6} mb='12'>
			{currentUser && (
				<Link as={RouterLink} to='/'>
					<AiFillHome size={24} />
				</Link>
			)}
			{!currentUser && (
				<Link as={RouterLink} to={"/auth"} onClick={() => dispatch(setAuthState("login"))}>
					Login
				</Link>
			)}

			<Image
				cursor={"pointer"}
				alt='logo'
				w={6}
				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				onClick={toggleColorMode}
			/>

			{currentUser && (
				<Flex alignItems={"center"} gap={4}>
					<Link as={RouterLink} to={`/update`}>
						<RxAvatar size={24} />
					</Link>
					<Link as={RouterLink} to={`/chat`}>
						<BsFillChatQuoteFill size={20} />
					</Link>
					<Link as={RouterLink} to={`/settings`}>
						<MdOutlineSettings size={20} />
					</Link>
					<Button size={"xs"} onClick={logout}>
						<FiLogOut size={20} />
					</Button>
				</Flex>
			)}

			{!currentUser && (
				<Link as={RouterLink} to={"/auth"} onClick={() =>dispatch(setAuthState("signup"))}>
					Sign up
				</Link>
			)}
			{/* {currentUser && (

			} */}
		</Flex>
	);
};

export default Header;