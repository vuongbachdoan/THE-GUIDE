import { Avatar, Box, Button, Card, CardBody, CardHeader, Flex, Heading, IconButton, Image, Link, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react'
import { posts } from '../../../mocks/data';
import { PostCard } from './PostCard';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../../../assets/images/student1.png';
import icons from '../../../assets/icons';
import { FaChevronDown } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
const { MailIcon, LinkedinIcon, GithubIcon } = icons;

export const PanelViewPost = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const bgWarning = useColorModeValue('red.100', 'red.900');
    const bgSuccess = useColorModeValue('green.100', 'green.900');
    const bdPending = useColorModeValue('gray.100', 'gray.900');
    const navigate = useNavigate();

    return (
        <>
            <Box
                bg={bg}
                width='100%'
                padding={6}
                borderRadius={20}
            >
                <Flex
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    columnGap={15}
                >
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Your posts</Text>
                    <Button onClick={() => navigate('/create-post',)} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Create</Button>
                </Flex>
                <Flex
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                >
                    <Flex
                        flexDirection='row'
                        columnGap={5}
                        alignItems='center'
                    >
                        <Text fontSize='sm'>Filter</Text>
                        <Text>/</Text>
                        <Menu>
                            <MenuButton width='fit-content' iconSpacing={2} as={Button} paddingY={1} paddingX={2} height='fit-content' rightIcon={<FaChevronDown size={12} />}>
                                <Text fontSize='sm'>Status</Text>
                            </MenuButton>
                            <MenuList
                                padding={1}
                                borderRadius={12}
                                boxShadow='xl'
                                minWidth='fit-content'
                            >
                                <MenuItem borderWidth={0} fontSize='sm' borderRadius={8}>Published</MenuItem>
                                <MenuItem borderWidth={0} fontSize='sm' borderRadius={8}>Pending</MenuItem>
                                <MenuItem borderWidth={0} fontSize='sm' borderRadius={8}>Rejected</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

            </Box>
            <Flex
                flexDirection='column'
                rowGap={3}
                flex={1}
                width='100%'
            >
                <Card
                    borderWidth={0}
                    borderRadius={20}
                    boxShadow='none'
                    opacity={0.5}
                >
                    <CardHeader>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4'>
                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                <Box
                                    flex={1}
                                >
                                    <Heading size='md' fontWeight='semibold' textAlign='left' noOfLines={1} textOverflow='ellipsis'>PRJ301  /  Java Fundamental </Heading>
                                    <Text fontSize='sm' fontWeight='semibold' color='gray.500' textAlign='left'>IT department</Text>
                                </Box>
                            </Flex>
                            <IconButton
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='See menu'
                                icon={<BsThreeDotsVertical />}
                            />
                        </Flex>
                    </CardHeader>
                    <CardBody
                        paddingTop={0}
                    >
                        <Text fontSize='sm' fontWeight='normal' color='gray.500' textAlign='left' noOfLines={3} textOverflow='ellipsis'>
                            A Java Servlet is a server-side technology that is used to create web applications. It is a Java class that extends the capabilities of a web server and responds to incoming requests. Servlets are robust and scalable because of the Java language 1.
                            Before Servlets, Common Gateway Interface (CGI) scripting language was commonly used as a server-side programming language. However, there were many disadvantages to this technology. Servlets provide many advantages over CGI, such as scalability, robustness, and better performance 1.
                        </Text>
                    </CardBody>
                </Card>

                <Card
                    borderWidth={0}
                    borderRadius={20}
                    boxShadow='none'
                    backgroundColor={bgWarning}
                >
                    <CardHeader>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4'>
                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                <Box
                                    flex={1}
                                >
                                    <Heading size='md' fontWeight='semibold' textAlign='left' noOfLines={1} textOverflow='ellipsis'>PRJ301  /  Java Fundamental </Heading>
                                    <Text fontSize='sm' fontWeight='semibold' color='gray.500' textAlign='left'>IT department</Text>
                                </Box>
                            </Flex>
                            <IconButton
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='See menu'
                                icon={<BsThreeDotsVertical />}
                            />
                        </Flex>
                    </CardHeader>
                    <CardBody
                        paddingTop={0}
                    >
                        <Text fontSize='sm' fontWeight='normal' color='gray.500' textAlign='left' noOfLines={3} textOverflow='ellipsis'>
                            A Java Servlet is a server-side technology that is used to create web applications. It is a Java class that extends the capabilities of a web server and responds to incoming requests. Servlets are robust and scalable because of the Java language 1.
                            Before Servlets, Common Gateway Interface (CGI) scripting language was commonly used as a server-side programming language. However, there were many disadvantages to this technology. Servlets provide many advantages over CGI, such as scalability, robustness, and better performance 1.
                        </Text>
                    </CardBody>
                </Card>

                <Card
                    borderWidth={0}
                    borderRadius={20}
                    boxShadow='none'
                    backgroundColor={bgSuccess}
                >
                    <CardHeader>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4'>
                                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                                <Box
                                    flex={1}
                                >
                                    <Heading size='md' fontWeight='semibold' textAlign='left' noOfLines={1} textOverflow='ellipsis'>PRJ301  /  Java Fundamental </Heading>
                                    <Text fontSize='sm' fontWeight='semibold' color='gray.500' textAlign='left'>IT department</Text>
                                </Box>
                            </Flex>
                            <IconButton
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='See menu'
                                icon={<BsThreeDotsVertical />}
                            />
                        </Flex>
                    </CardHeader>
                    <CardBody
                        paddingTop={0}
                    >
                        <Text fontSize='sm' fontWeight='normal' color='gray.500' textAlign='left' noOfLines={3} textOverflow='ellipsis'>
                            A Java Servlet is a server-side technology that is used to create web applications. It is a Java class that extends the capabilities of a web server and responds to incoming requests. Servlets are robust and scalable because of the Java language 1.
                            Before Servlets, Common Gateway Interface (CGI) scripting language was commonly used as a server-side programming language. However, there were many disadvantages to this technology. Servlets provide many advantages over CGI, such as scalability, robustness, and better performance 1.
                        </Text>
                    </CardBody>
                </Card>
            </Flex>
        </>
    );
}