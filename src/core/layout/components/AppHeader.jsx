import { Avatar, Box, Button, Flex, Input, InputGroup, InputRightElement, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { FaChevronDown, FaSearch, FaSignOutAlt, FaUser } from "react-icons/fa";

export const AppHeader = () => {
    return (
        <Box
            marginX={3}
            marginY={1}
            height={72}
        >
            <Flex
                width='100%'
                padding={3}
                alignItems='center'
                justifyContent='space-between'
            >
                <Flex
                    alignItems='center'
                    flexDirection='row'
                    columnGap={15}
                    width={415}
                >
                    <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                    <Menu>
                        <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                            DE160256
                        </MenuButton>
                        <MenuList>
                            <MenuItem icon={<FaUser />}>
                                Profile
                            </MenuItem>
                            <MenuItem icon={<FaSignOutAlt />}>
                                Log out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                <Text fontSize='2xl' fontWeight='bold'>The Guide</Text>

                <InputGroup maxWidth={415} height='44px' borderRadius={12}>
                    <Input placeholder='Search' borderRadius={12}/>
                    <InputRightElement>
                        <FaSearch color='#A0A0A0'/>
                    </InputRightElement>
                </InputGroup>
            </Flex>
        </Box>
    );
}