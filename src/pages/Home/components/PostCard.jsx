import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import icons from '../../../assets/icons';
const { HeartIcon, CommentIcon, ShareIcon, EyeIcon } = icons;

/**
 * 
 * Post Scheme
 * {
        creator: 0,
        title: 'Introduction to web based Java application ',
        content: 'A Java Servlet is a server-side technology that is used to create web applications. It is a Java class that extends the capabilities of a web server and responds to incoming requests. Servlets are robust and scalable because of the Java language 1. Before Servlets, Common Gateway Interface (CGI) scripting language was commonly used as a server-side programming language. However, there were many disadvantages to this technology. Servlets provide many advantages over CGI, such as scalability, robustness, and better performance 1.',
        description: 'A Java Servlet is a server-side technology that is used to create web applications. It is a Java class that extends the capabilities of a web server and responds to incoming requests. Servlets are robust and scalable because of the Java language 1. Before Servlets, Common Gateway Interface (CGI) scripting language was commonly used as a server-side programming language. However, there were many disadvantages to this technology. Servlets provide many advantages over CGI, such as scalability, robustness, and better performance 1.',
        subjectCode: 'PRJ301',
        coverImage: './assets/images/PRJ301_cover_image.png',
        liked: 1000,
        department: 'Information Technology',
        comments: [
            0,
            1
        ],
        shared: 2,
        viewed: 1000
    }
 */

export const PostCard = ({data}) => {
    return (
        <Card
            borderWidth={0}
            borderRadius={20}
            boxShadow='none'
        >
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4'>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box
                            flex={1}
                        >
                            <Heading size='md' fontWeight='semibold' textAlign='left' noOfLines={1} textOverflow='ellipsis'>{data.subjectCode}  /  {data.title} </Heading>
                            <Text fontSize='sm' fontWeight='semibold' color='gray.500' textAlign='left'>{data.department}</Text>
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
            <CardBody>
                <Text fontSize='sm' fontWeight='normal' color='gray.500' textAlign='left' noOfLines={3} textOverflow='ellipsis'>
                    A Java Servlet is a server-side technology that is used to create web applications. It is a Java class that extends the capabilities of a web server and responds to incoming requests. Servlets are robust and scalable because of the Java language 1.
                    Before Servlets, Common Gateway Interface (CGI) scripting language was commonly used as a server-side programming language. However, there were many disadvantages to this technology. Servlets provide many advantages over CGI, such as scalability, robustness, and better performance 1.
                </Text>
            </CardBody>
            <Image
                objectFit='cover'
                src={data.coverImage}
                alt='cover image'
                maxHeight={240}
            />

            <CardFooter
                justifyContent='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '72px',
                    },
                }}
            >
                <Flex>
                    <Button width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<HeartIcon />}>
                        <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{data.liked}</Text>
                    </Button>
                    <Button width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<CommentIcon />}>
                        <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{data.comments.length}</Text>
                    </Button>
                    <Button width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<ShareIcon />}>
                        <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{data.shared}</Text>
                    </Button>
                </Flex>
                <Flex flexDirection='row' alignItems='center' padding={1} >
                    <EyeIcon />
                    <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{data.viewed}</Text>
                </Flex>
            </CardFooter>
        </Card>
    );
}