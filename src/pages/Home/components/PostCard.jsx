import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import icons from '../../../assets/icons';
import React from 'react';
const { HeartIcon, CommentIcon, ShareIcon, EyeIcon } = icons;

/**
 * 
 * Post Scheme
 *{
 *    "content": "Content",
 *    "department": "Software Engineering",
 *    "commentIds": null,
 *    "status": "pending",
 *    "shared": 0,
 *    "subjectCode": "Subject code",
 *    "liked": 0,
 *    "createAt": "2023-10-26T02:52:49.673Z",
 *    "updatedAt": "",
 *    "description": "",
 *    "viewed": 0,
 *    "id": "Test title-dbf5e1b7-fcca-4343-9962-74567547429d",
 *    "creatorId": "google_116711084401427871681",
 *    "title": "Test title"
 *}
 */

export const PostCard = ({ data }) => {
    React.useEffect(() => {
        console.log(data)
    }, [])
    return (
        <Card
            borderWidth={0}
            borderRadius={20}
            boxShadow='none'
            width='100%'
        >
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4'>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Box
                            flex={1}
                        >
                            <Heading size='md' fontWeight='semibold' textAlign='left' noOfLines={1} textOverflow='ellipsis'>{data?.subjectCode}  /  {data?.title} </Heading>
                            <Text fontSize='sm' fontWeight='semibold' color='gray.500' textAlign='left'>{data?.department}</Text>
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
                <Text fontSize='sm' fontWeight='normal' color='gray.500' textAlign='left' noOfLines={3} textOverflow='ellipsis'>{data?.content}</Text>
            </CardBody>
            {
                data?.cover &&
                <Image
                    objectFit='cover'
                    src={data?.cover}
                    alt='cover image'
                    maxHeight={240}
                />
            }

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
                        <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{data?.liked != 0 ? data?.liked : '_'}</Text>
                    </Button>
                    <Button width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<CommentIcon />}>
                        <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{data?.comments ? data?.comments : '_'}</Text>
                    </Button>
                    <Button width='72px' flex='1' variant='ghost' borderRadius={10} padding={1} columnGap={0} leftIcon={<ShareIcon />}>
                        <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{data?.shared != 0 ? data?.shared : '_'}</Text>
                    </Button>
                </Flex>
                <Flex flexDirection='row' alignItems='center' padding={1} >
                    <EyeIcon />
                    <Text fontSize='sm' marginRight={3} fontWeight='semibold' color='gray.500'>{data?.viewed != 0 ? data?.viewed : '_'}</Text>
                </Flex>
            </CardFooter>
        </Card>
    );
}