import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { InformationIcon } from '../../../assets/icons/InformationIcon';
import Subject1 from '../../../assets/images/subject1.png';
import { getSubjects, joinSubject } from '../../../core/services/subject';
import { useSelector } from 'react-redux';
import { updateUser } from '../../../core/services/user';
import { filterMostJoinedSubject } from '../../../helper/filterMostJoinedSubject';

import icons from '../../../assets/icons';
const { PlusIcon, AddPostIcon } = icons;

export const SubjectsPanel = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const navigate = useNavigate();
    const user = useSelector((state) => state.profileData.data);
    const [subjects, setSubjects] = React.useState([]);
    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [alertMessage, setAlertMessage] = React.useState(null);
    const [mostJoinedSubject, setMostJoinedSubject] = React.useState(null);

    React.useEffect(() => {
        getSubjects()
            .then((res) => {
                setSubjects(res);
            })
            .catch((err) => console.error(err));
    }, []);

    React.useEffect(() => {
        const mostJoined = filterMostJoinedSubject(subjects);
        setMostJoinedSubject(mostJoined);
    }, [subjects])

    const handleJoinSubject = (subject) => {
        if (!(subject.studentIds.includes(user.id) || subject.lectureIds.includes(user.id))) {
            joinSubject(
                subject.subjectCode,
                {
                    email: user.email,
                    id: user.id
                }
            )
                .then(() => {
                    updateUser({
                        ...user,
                        subjects: [
                            ...user.subjects,
                            subject.subjectCode
                        ]
                    }).then(() => {
                        setAlertMessage(`Successfully join subject ${subject.subjectCode}!`);
                        onOpen();
                        navigate('/subject');
                    }).catch(() => {
                        setAlertMessage(`Fail to join subject ${subject.subjectCode}!`);
                        onOpen();
                    })
                })
                .catch(() => {
                    setAlertMessage(`Fail to join subject ${subject.subjectCode}!`);
                    onOpen();
                })
        } else {
            setAlertMessage(`You already join subject ${subject.subjectCode}!`);
            onOpen();
        }
    }

    return (
        <>
            <Modal closeOnOverlayClick={false} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent
                    borderRadius={20}
                >
                    <ModalHeader>Message</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight='semibold' fontSize='sm'>{alertMessage}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button borderRadius={15} width='100px' colorScheme='red' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Flex
                flexDirection='column'
                height='100%'
                rowGap={3}
                display={{ base: 'none', lg: 'flex' }}
                ref={finalRef}
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
                            onClick={() => navigate('/create-post',)}
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
                                <Text textAlign='left' fontSize='x-small' color='gray.500' noOfLines={1} textOverflow='ellipsis'>Introduction to web based Java application </Text>
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
                        {
                            subjects.map((subject) => (
                                <Flex
                                    flexDirection='row'
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Flex
                                        flexDirection='row'
                                        columnGap={3}
                                    >
                                        <Image objectFit='cover' src={subject.thumbnail} width={50} height={50} borderRadius={8} />
                                        <Box>
                                            <Text textAlign='left' fontSize='md' fontWeight='semibold' noOfLines={1} textOverflow='ellipsis'>{subject.subjectCode}</Text>
                                            <Text textAlign='left' fontSize='x-small' color='gray.500' noOfLines={1} textOverflow='ellipsis'>{subject.subjectName}</Text>
                                        </Box>
                                    </Flex>

                                    <Stack onClick={() => handleJoinSubject(subject)} cursor='pointer'>
                                        <Button iconSpacing={0} borderRadius={10} variant='ghost' width='40px' height='40px' leftIcon={<PlusIcon width={30} height={30} />} />
                                    </Stack>
                                </Flex>
                            ))
                        }
                    </Flex>
                </Box>

                {
                    mostJoinedSubject &&
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
                            <Image objectFit='cover' src={mostJoinedSubject.thumbnail} width={100} height={100} borderRadius={8} />
                            <Text fontWeight='semibold' fontSize='md' color='gray.500' marginBlock={3}>Recommend for you</Text>
                            <Text fontWeight='semibold' fontSize='xl'>{mostJoinedSubject?.subjectCode}</Text>
                            <Stack cursor='pointer' onClick={() => handleJoinSubject(mostJoinedSubject)}><Text fontSize='md' color='#FF8F46' _hover={{ textDecoration: 'underline' }}>Join</Text></Stack>
                        </Flex>
                    </Box>
                }
            </Flex>
        </>
    );
}