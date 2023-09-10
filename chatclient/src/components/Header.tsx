

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
} from "@chakra-ui/react";
import useAuth from "../contexts/Authcontext";
import { Link } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";



export  function Header() {
  const {currentuser,logout} = useAuth()
  return (
    <>
      <Box bg={"black"} p={2} position={"fixed"} h={"auto"} w={"full"}>
        <Flex h={"auto"} alignItems={"center"} justifyContent={"space-around"}>
          <Box>
            <Text fontSize={"3xl"} color={"white"} fontWeight={"extrabold"}>
              ChatApp
            </Text>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"lg"} src={currentuser?.AvatarPic} />
                </MenuButton>
                <MenuList alignItems={"center"} zIndex={"base"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} src={currentuser?.AvatarPic} />
                  </Center>
                  <br />
                  <Center>
                    <p>{currentuser?.username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>
                    <Link to={"/setpic"}>Set Profile Picture</Link>
                  </MenuItem>
                  <MenuDivider />
                  <Center>
                    <Button gap={3} onClick={logout}>
                       Logout <IoLogOutOutline/>
                    </Button>
                  </Center>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}