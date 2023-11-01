import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import icons from '../../../assets/icons';
import React from 'react';
import { convertTimestamp } from '../../../helper/convertTimestamp';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { getPost } from '../../../core/services/post';
import { getSubject } from '../../../core/services/subject';
const { HeartIcon, CommentIcon, ShareIcon, EyeIcon, ReturnForwardIcon } = icons;

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

export const NotificationCard = ({key, data}) => {
    const navigate = useNavigate();
    const handleNavigateDetail = (type, id) => {
        if(type === 'post_change') {
            navigate(`/posts/detail/${id}`);
        } else if(type === 'subject_change') {
            // navigate('/subjects/detail/')
        }
    }


    const [description, setDescription] = React.useState('');
    React.useEffect(() => {
        if(data) {
            if(data.type === 'post_change') {
                getPost(data.navigate) 
                    .then((res) => {
                        setDescription(`- ${res.title}`);
                    })
            }

            if(data.type === 'subject_change') {
                getSubject(data.navigate) 
                    .then((res) => {
                        setDescription(res.subjectName);
                    })
            }
        }
    }, [data])

    return (
        <Card
            borderWidth={0}
            borderRadius={20}
            overflow='hidden'
            boxShadow='none'
            flex={1}
        >
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4'>
                        <Avatar name='S' src='https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/387041601_1058223048869922_4797909499667327158_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3bxzsa54YskAX8YxwhR&_nc_ht=scontent.fhan4-3.fna&oh=00_AfADKR9kDLCcKJaMkTaXlYYk2gcYHJbRgqPc8nbfGI0VbQ&oe=6530ED85'/>

                        <Box
                            flex={1}
                        >
                            <Heading size='md' fontWeight='semibold' textAlign='left' noOfLines={1} textOverflow='ellipsis'>{data.message}</Heading>
                            <Text fontSize='sm' fontWeight='semibold' color='gray.500' textAlign='left'>{convertTimestamp(data.createAt)}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<ReturnForwardIcon width={18} height={18}/>}
                        onClick={() => handleNavigateDetail(data.type, data.navigate)}
                    />
                </Flex>
            </CardHeader>
            <CardBody
                backgroundColor="#1E1E1E20"
            >
                <Text fontSize='sm' fontWeight='normal' color='gray.500' textAlign='left' noOfLines={3} textOverflow='ellipsis'>{description}</Text>
            </CardBody>
        </Card>
    );
}