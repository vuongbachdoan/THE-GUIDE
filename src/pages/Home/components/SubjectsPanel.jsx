import { Link, useNavigate } from 'react-router-dom';
import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import { InformationIcon } from '../../../assets/icons/InformationIcon';
import Subject1 from '../../../assets/images/subject1.png';
import icons from '../../../assets/icons';
const { PlusIcon, AddPostIcon } = icons;

export const SubjectsPanel = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const navigate = useNavigate();

    return (
        <Flex
            flexDirection='column'
            height='100%'
            rowGap={3}
            display={{ base: 'none', lg: 'flex' }}
        >

            <Box
                width={285}
                bg={bg}
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
                    <Box
                        onClick={() => navigate('/create-post')}
                        cursor='pointer'
                    >
                        <AddPostIcon width={40} height={40} />
                    </Box>
                </Flex>

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

            <Box
                width={285}
                bg={bg}
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
                    <Text fontSize='xl' fontWeight='semibold' marginBlock={3}>Join a subject</Text>
                    <InformationIcon width={40} height={40} />
                </Flex>

                <Flex
                    flexDirection='column'
                    rowGap={3}
                    marginTop={3}
                >
                    <Flex
                        flexDirection='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Flex
                            flexDirection='row'
                            columnGap={3}
                        >
                            <Image src={Subject1} width={50} height={50} borderRadius={8} />
                            <Box>
                                <Text textAlign='left' fontSize='md' fontWeight='semibold'>PRJ301</Text>
                                <Text textAlign='left' fontSize='sm' fontWeight='medium' color='gray.500'>IT</Text>
                            </Box>
                        </Flex>

                        <PlusIcon width={40} height={40} />
                    </Flex>

                    <Flex
                        flexDirection='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Flex
                            flexDirection='row'
                            columnGap={3}
                        >
                            <Image src={Subject1} width={50} height={50} borderRadius={8} />
                            <Box>
                                <Text textAlign='left' fontSize='md' fontWeight='semibold'>PRJ301</Text>
                                <Text textAlign='left' fontSize='sm' fontWeight='medium' color='gray.500'>IT</Text>
                            </Box>
                        </Flex>

                        <PlusIcon width={40} height={40} />
                    </Flex>

                    <Flex
                        flexDirection='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Flex
                            flexDirection='row'
                            columnGap={3}
                        >
                            <Image src={Subject1} width={50} height={50} borderRadius={8} />
                            <Box>
                                <Text textAlign='left' fontSize='md' fontWeight='semibold'>PRJ301</Text>
                                <Text textAlign='left' fontSize='sm' fontWeight='medium' color='gray.500'>IT</Text>
                            </Box>
                        </Flex>

                        <PlusIcon width={40} height={40} />
                    </Flex>
                </Flex>
            </Box>

            <Box
                width={285}
                bg={bg}
                borderRadius={20}
                paddingTop={15}
                paddingX={30}
                paddingBottom={30}
            >
                <Flex
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    rowGap={3}
                >
                    <Image src={Subject1} width={100} height={100} borderRadius={8} />
                    <Text fontWeight='semibold' fontSize='md' color='gray.500' marginBlock={3}>Recommend for you</Text>
                    <Text fontWeight='semibold' fontSize='xl'>PRJ301</Text>
                    <Link to='/subject'><Text fontSize='md' color='#FF8F46' _hover={{ textDecoration: 'underline' }}>Join</Text></Link>
                </Flex>
            </Box>
        </Flex>
    );
}