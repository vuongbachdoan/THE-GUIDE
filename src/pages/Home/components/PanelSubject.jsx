import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, GridItem, Heading, IconButton, Image, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Text, Textarea, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import icons from '../../../assets/icons';
import { FaChevronDown } from 'react-icons/fa';
import Subject1 from '../../../assets/images/PRJ301.png';
import DecorOrange from '../../../assets/images/decor_role_orange.png';
import SubjectDecor1 from '../../../assets/images/subject_decor_1.png';
import UserAvatar from '../../../assets/images/student1.png';
import { Link } from 'react-router-dom';

const { HeartIcon, CommentIcon, ShareIcon, EyeIcon, LinkIcon } = icons;

export const PanelSubject = () => {
    const color = useColorModeValue('#1E1E1E', '#FFF');
    const placeholderColor = useColorModeValue('gray.500', 'gray.400')
    const bg = useColorModeValue('#FFF', 'gray.700');

    return (
        <>
            <Card
                borderWidth={0}
                borderRadius={20}
                boxShadow='none'
                width='100%'
            >
                <Box margin={6}>
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Invitations</Text>
                </Box>
                <CardBody>
                    <Flex
                        flexDirection='column'
                        rowGap={15}
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
                                    <Text textAlign='left' fontSize='md' fontWeight='semibold'>IT  /  PRJ301</Text>
                                    <Text textAlign='left' fontSize='sm' color='gray.500' noOfLines={1} textOverflow='ellipsis'>HoaDNT invited you to this subject</Text>
                                    <Flex
                                        flexDirection='row'
                                        alignItems='center'
                                    >
                                        <LinkIcon width={18} height={18} />
                                        <Text fontSize='x-small' color='gray.500'>Nguyen Thi Thuy Dung and 500 others</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Flex
                                columnGap={15}
                            >
                                <Button borderRadius={15}>Ignore</Button>
                                <Button borderRadius={15} backgroundColor='#FF8F46' _hover={{ backgroundColor: '#E86C1C' }} color='white'>Accept</Button>
                            </Flex>
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
                                    <Text textAlign='left' fontSize='md' fontWeight='semibold'>IT  /  PRJ301</Text>
                                    <Text textAlign='left' fontSize='sm' color='gray.500' noOfLines={1} textOverflow='ellipsis'>HoaDNT invited you to this subject</Text>
                                    <Flex
                                        flexDirection='row'
                                        alignItems='center'
                                    >
                                        <LinkIcon width={18} height={18} />
                                        <Text fontSize='x-small' color='gray.500'>Nguyen Thi Thuy Dung and 500 others</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                            <Flex
                                columnGap={15}
                            >
                                <Button borderRadius={15}>Ignore</Button>
                                <Button borderRadius={15} backgroundColor='#FF8F46' _hover={{ backgroundColor: '#E86C1C' }} color='white'>Accept</Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </CardBody>
            </Card>

            <Card
                borderWidth={0}
                borderRadius={20}
                boxShadow='none'
                width='100%'
            >
                <Box margin={6}>
                    <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Subjects you may like</Text>
                </Box>
                <CardBody>
                    <Grid
                        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(2, 1fr)' }} gap={3}
                    >
                        <GridItem
                            bg={bg}
                            borderRadius={20}
                        >
                            <Flex
                                justifyContent='center'
                                alignItems='center'
                                position='relative'
                                margin='20px'
                                flexDirection='column'
                            >
                                <Image src={SubjectDecor1}
                                    maxHeight={75}
                                    borderRadius={20}
                                    objectFit='cover'
                                    position='absolute'
                                    top={0}
                                    left={0}
                                    width='100%'
                                />
                                <Image marginTop={30} src={Subject1} width={100} height={100} borderRadius={14} zIndex={10} />
                                <Text marginTop={3} fontWeight='semibold' fontSize='xl'>PRJ301</Text>
                                <Text marginTop={3} fontWeight='semibold' fontSize='sm' lineHeight='15px'>Java based web application</Text>
                                <Flex
                                    flexDirection='row'
                                    alignItems='center'
                                >
                                    <LinkIcon width={18} height={18} />
                                    <Text textAlign='center' fontSize='x-small' color='gray.500'>Dung and 500 others</Text>
                                </Flex>
                                <Link to='/subject-detail'><Text fontSize='md' color='#FF8F46' _hover={{ textDecoration: 'underline' }}>Join</Text></Link>
                            </Flex>
                        </GridItem>
                        <GridItem
                            bg={bg}
                            borderRadius={20}
                        >
                            <Flex
                                justifyContent='center'
                                alignItems='center'
                                position='relative'
                                margin='20px'
                                flexDirection='column'
                            >
                                <Image src={SubjectDecor1}
                                    maxHeight={75}
                                    borderRadius={20}
                                    objectFit='cover'
                                    position='absolute'
                                    top={0}
                                    left={0}
                                    width='100%'
                                />
                                <Image marginTop={30} src={Subject1} width={100} height={100} borderRadius={14} zIndex={10} />
                                <Text marginTop={3} fontWeight='semibold' fontSize='xl'>PRJ301</Text>
                                <Text marginTop={3} fontWeight='semibold' fontSize='sm' lineHeight='15px'>Java based web application</Text>
                                <Flex
                                    flexDirection='row'
                                    alignItems='center'
                                >
                                    <LinkIcon width={18} height={18} />
                                    <Text textAlign='center' fontSize='x-small' color='gray.500'>Dung and 500 others</Text>
                                </Flex>
                                <Link to='/subject-detail'><Text fontSize='md' color='#FF8F46' _hover={{ textDecoration: 'underline' }}>Join</Text></Link>
                            </Flex>
                        </GridItem>
                        <GridItem
                            bg={bg}
                            borderRadius={20}
                        >
                            <Flex
                                justifyContent='center'
                                alignItems='center'
                                position='relative'
                                margin='20px'
                                flexDirection='column'
                            >
                                <Image src={SubjectDecor1}
                                    maxHeight={75}
                                    borderRadius={20}
                                    objectFit='cover'
                                    position='absolute'
                                    top={0}
                                    left={0}
                                    width='100%'
                                />
                                <Image marginTop={30} src={Subject1} width={100} height={100} borderRadius={14} zIndex={10} />
                                <Text marginTop={3} fontWeight='semibold' fontSize='xl'>PRJ301</Text>
                                <Text marginTop={3} fontWeight='semibold' fontSize='sm' lineHeight='15px'>Java based web application</Text>
                                <Flex
                                    flexDirection='row'
                                    alignItems='center'
                                >
                                    <LinkIcon width={18} height={18} />
                                    <Text textAlign='center' fontSize='x-small' color='gray.500'>Dung and 500 others</Text>
                                </Flex>
                                <Link to='/subject-detail'><Text fontSize='md' color='#FF8F46' _hover={{ textDecoration: 'underline' }}>Join</Text></Link>
                            </Flex>
                        </GridItem>
                        <GridItem
                            bg={bg}
                            borderRadius={20}
                        >
                            <Flex
                                justifyContent='center'
                                alignItems='center'
                                position='relative'
                                margin='20px'
                                flexDirection='column'
                            >
                                <Image src={SubjectDecor1}
                                    maxHeight={75}
                                    borderRadius={20}
                                    objectFit='cover'
                                    position='absolute'
                                    top={0}
                                    left={0}
                                    width='100%'
                                />
                                <Image marginTop={30} src={Subject1} width={100} height={100} borderRadius={14} zIndex={10} />
                                <Text marginTop={3} fontWeight='semibold' fontSize='xl'>PRJ301</Text>
                                <Text marginTop={3} fontWeight='semibold' fontSize='sm' lineHeight='15px'>Java based web application</Text>
                                <Flex
                                    flexDirection='row'
                                    alignItems='center'
                                >
                                    <LinkIcon width={18} height={18} />
                                    <Text textAlign='center' fontSize='x-small' color='gray.500'>Dung and 500 others</Text>
                                </Flex>
                                <Link to='/subject-detail'><Text fontSize='md' color='#FF8F46' _hover={{ textDecoration: 'underline' }}>Join</Text></Link>
                            </Flex>
                        </GridItem>
                    </Grid>
                </CardBody>
            </Card >
        </>
    );
}