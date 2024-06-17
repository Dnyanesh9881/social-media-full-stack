// import { Avatar, Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
// import React, { useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import Actions from "./Actions";

// const UserPost = ({ postImg, postTitle, likes, replies }) => {
//   const [liked, setLiked] = useState(false);
//   return (
//     <Link to={"/mark/post/1"}>
//       <Flex gap={4} mt={5}>
//         <Flex flexDirection={"column"} gap={2} alignItems={"center"}>
//           <Avatar size={"md"} name="Mark Zuckerberge" src="/zuck-avatar.png" />
//           <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
//           <Box position={"relative"} w={"full"} mb={5}>
//             <Avatar
//               size={"xs"}
//               name="john doe"
//               src="https://bit.ly/dan-abramov"
//               position={"absolute"}
//               top={"0px"}
//               left={"0"}
//               padding={"2px"}
//             />
//             <Avatar
//               size={"xs"}
//               name="john doe"
//               src="https://bit.ly/sage-adebayo"
//               position={"absolute"}
//               top={"0px"}
//               left={"6"}
//               padding={"2px"}
//             />
//             <Avatar
//               size={"xs"}
//               name="john doe"
//               src="https://bit.ly/kent-c-dodds"
//               position={"absolute"}
//               top={"5"}
//               left={"3"}
//               padding={"2px"}
//             />
//           </Box>
//         </Flex>
//         <Flex w={"full"} flexDirection={"column"}>
//           <Flex
//             w={"full"}
//             justifyContent={"space-between"}
//             alignItems={"start"}
//             mb={2}
//           >
//             <Flex alignItems={"center"} gap={2}>
//               <Text fontWeight={"bold"} fontSize={"md"}>
//                 markzuckerberge
//               </Text>
//               <Box>
//                 <Image w={4} src="/verified.png" />
//               </Box>
//             </Flex>
//             <Flex alignItems={"center"} gap={3}>
//               <Text color={"#616161"}>1d</Text>
//               <Box>
//                 <BsThreeDots />
//               </Box>
//             </Flex>
//           </Flex>
//           <Text my={4}>{postTitle}</Text>
//           {postImg && (
//             <Box
//               borderRadius={6}
//               overflow={"hidden"}
//               border={"1px solid #616161"}
//             >
//               <Image src={postImg} w={"full"} />
//             </Box>
//           )}
//           <Flex my={3}>
//             <Actions liked={liked} setLiked={setLiked}/>
//           </Flex>
//           <Flex gap={2} alignItems={"center"}>
//             <Text color={"gray.light"} fontSize="sm">
//               {replies} replies
//             </Text>
//             <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
//             <Text color={"gray.light"} fontSize="sm">
//               {likes} likes
//             </Text>
//           </Flex>
//         </Flex>
//       </Flex>
//       <Divider color={"gray.light"} mt={8} />
//     </Link>
//   );
// };

// export default UserPost;