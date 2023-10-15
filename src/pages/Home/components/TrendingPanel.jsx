import { Box, Flex, Image, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import Subject1 from '../../../assets/images/subject1.png';
import icons from "../../../assets/icons";
import { FaSearch } from "react-icons/fa";
const { AddPostIcon } = icons;

export const TrendingPanel = () => {
    return (
        <Flex
            flexDirection='column'
            height='100%'
            rowGap={3}
        >
            <Box
                width={285}
                backgroundColor='#FFF'
                borderRadius={20}
                paddingTop={15}
                paddingX={30}
                paddingBottom={30}
            >
                <Flex
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-between'
                    fontSize='xl'
                    fontWeight='semibold'
                >
                    <Text fontSize='xl' fontWeight='semibold' marginBlock={3}>Trending</Text>
                    <AddPostIcon width={40} height={40} />
                </Flex>

                <InputGroup maxWidth={415} height='44px' borderRadius={12}>
                    <Input placeholder='Search post' borderRadius={12} />
                    <InputRightElement>
                        <FaSearch color='#A0A0A0' />
                    </InputRightElement>
                </InputGroup>

                <Flex
                    flexDirection='column'
                    rowGap={3}
                    marginTop={3}
                >
                    <Flex
                        flexDirection='row'
                        columnGap={3}
                    >
                        <Image src={Subject1} width={50} height={50} borderRadius={8} />
                        <Box>
                            <Text textAlign='left' fontSize='md' fontWeight='semibold'>PRJ301</Text>
                            <Text textAlign='left' fontSize='sm' color='gray.500' noOfLines={1} textOverflow='ellipsis'>Introduction to web based Java application </Text>
                        </Box>
                    </Flex>

                    <Flex
                        flexDirection='row'
                        columnGap={3}
                    >
                        <Image src={Subject1} width={50} height={50} borderRadius={8} />
                        <Box>
                            <Text textAlign='left' fontSize='md' fontWeight='semibold'>PRJ301</Text>
                            <Text textAlign='left' fontSize='sm' color='gray.500' noOfLines={1} textOverflow='ellipsis'>Introduction to web based Java application </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Flex>
    );
}