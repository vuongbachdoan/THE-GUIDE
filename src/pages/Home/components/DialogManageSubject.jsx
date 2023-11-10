import { Avatar, AvatarGroup, Box, Button, CheckboxIcon, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Switch, Text, useClipboard, useDisclosure } from "@chakra-ui/react";
import React from "react";
import PlaceholderImage from '../../../assets/images/placeholder.png';
import icons from "../../../assets/icons";
import { getUser } from "../../../core/services/user";
import { updateSubjectThumbnail } from "../../../core/services/photo";
import { IoIosCopy, IoMdCopy } from "react-icons/io";
const { CameraIcon } = icons;

export const DialogManageSubject = ({ canOpen, close, leave, subjectData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    React.useEffect(() => {
        if (canOpen) {
            onOpen();
        } else {
            onClose();
        }
    }, [canOpen]);

    const handleCloseDialog = () => {
        close();
    }

    const handleLeave = () => {
        leave();
    }

    const getParticipant = async () => {
        const studentIds = subjectData.studentIds;
        const lectureIds = subjectData.lectureIds;

        const studentsData = await Promise.all(studentIds.map(studentId => getUser(studentId)));
        const lecturesData = await Promise.all(lectureIds.map(lectureId => getUser(lectureId)));

        return ({ lecturesData, studentsData });
    }


    const [participants, setParticipants] = React.useState({
        lectures: [],
        students: []
    });
    React.useEffect(() => {
        getParticipant()
            .then((userData) => {
                setParticipants({
                    lectures: userData.lecturesData,
                    students: userData.studentsData
                });
            })
            .catch((err) => console.error(err));
    }, []);

    const [currentTab, setCurrentTab] = React.useState('Invite people');

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={canOpen}
                onClose={handleCloseDialog}
            >
                <ModalOverlay />
                <ModalContent
                    borderRadius={20}
                    maxWidth='900px'
                    minHeight='75vh'
                >
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex columnGap={3}>
                            <Flex
                                flexDirection='column'
                                justifyContent='flex-start'
                                rowGap={1}
                            >
                                <Button onClick={() => setCurrentTab('Invite people')} width='240px'><Text width='100%' textAlign='left' fontWeight='semibold' fontSize='sm'>Invite people</Text></Button>
                                <Button onClick={() => setCurrentTab('Subject settings')} width='240px'><Text width='100%' textAlign='left' fontWeight='semibold' fontSize='sm'>Subject settings</Text></Button>
                                <Button onClick={() => setCurrentTab('Decorations')} width='240px'><Text width='100%' textAlign='left' fontWeight='semibold' fontSize='sm'>Decorations</Text></Button>
                                <Button onClick={() => handleLeave()} width='240px'><Text width='100%' textAlign='left' fontWeight='semibold' fontSize='sm' color='red.500'>Leave</Text></Button>
                            </Flex>
                            <Flex flex={1} flexDirection='column'>
                                {
                                    currentTab === 'Invite people' &&
                                    <InvitePeople participants={participants} />
                                }
                                {
                                    currentTab === 'Subject settings' &&
                                    <SubjectSettings subjectCode={subjectData.subjectCode} />
                                }
                                {
                                    currentTab === 'Decorations' &&
                                    <Decoration subjectData={subjectData} />
                                }
                            </Flex>
                        </Flex>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

const InvitePeople = ({ participants }) => {
    return (
        <FormControl>
            <FormLabel>Invite via Email</FormLabel>
            <AvatarGroup size='sm' max={5} marginBottom={3}>
                {
                    participants?.lectures?.map((user) => (
                        <Avatar name={user?.username} src={user?.avatar} />
                    ))
                }
                {
                    participants?.students?.map((user) => (
                        <Avatar name={user?.username} src={user?.avatar} />
                    ))
                }
            </AvatarGroup>
            <InputGroup>
                <Input backgroundColor='#CBD5E010' placeholder='example@email.com' fontSize='small' size='sm' borderRadius={10} />
                <InputRightElement>
                    <CheckboxIcon color='green.500' />
                </InputRightElement>
            </InputGroup>
            <Text marginTop={3} fontSize='x-small' color='gray.500'>* Hit enter to send invitation via email</Text>
            <Text fontSize='x-small' color='gray.500'>Let invite other peoples to this subject and learn together!</Text>
        </FormControl>
    );
}

const SubjectSettings = ({ subjectCode }) => {
    const [showInviteLink, setShowInviteLink] = React.useState(false);
    const { hasCopied, onCopy } = useClipboard(`https://docs.rapify-cloud.com/subjects/detail/${subjectCode}`);

    return (
        <Flex
            flexDirection='column'
            rowGap={3}
        >
            <FormControl display='flex' alignItems='center'>
                <Switch marginRight={3} colorScheme='orange' id='allow-publish' />
                <FormLabel htmlFor='allow-publish' mb='0'>
                    <Text fontSize='small'>Student post is auto publish without approval?</Text>
                </FormLabel>
            </FormControl>

            <FormControl display='flex' alignItems='center'>
                <Switch isChecked={showInviteLink} onChange={() => setShowInviteLink(!showInviteLink)} marginRight={3} colorScheme='orange' id='allow-join' />
                <FormLabel htmlFor='allow-join' mb='0'>
                    <Text fontSize='small'>Invite other people by a link?</Text>
                </FormLabel>
            </FormControl>

            {
                showInviteLink &&
                <Flex
                    flexDirection='row'
                    columnGap={1}
                >
                    <Input fontSize='x-small' borderRadius={10} size='sm' value={`https://docs.rapify-cloud.com/subjects/detail/${subjectCode}`} isReadOnly />
                    <Stack cursor='pointer' backgroundColor='#CBD5E050' _hover={{
                        backgroundColor: '#CBD5E0'
                    }} justifyContent='center' alignItems='center' borderRadius={10} width='32px' height='32px' onClick={onCopy}>
                        <IoIosCopy color={hasCopied ? '#00000050' : '#FF8F46'} />
                    </Stack>
                </Flex>
            }
        </Flex>
    );
}

const Decoration = ({ subjectData }) => {
    const [isLoadingThumbnail, setIsLoadingThumbnail] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState(subjectData?.thumbnail);
    const previewImageRef = React.useRef();

    const handlePickerImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            setIsLoadingThumbnail(true);
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            const type = file.type.split('/')[1];

            updateSubjectThumbnail(subjectData.subjectCode, base64String, type)
                .then((res) => {
                    setPreviewImage(res);
                    setIsLoadingThumbnail(false);
                })
                .catch(() => {
                    setPreviewImage(null);
                    setIsLoadingThumbnail(false);
                })
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <Flex
            flexDirection='column'
            alignItems='center'
            rowGap={3}
        >
            <Box
                position='relative'
                width={200} height={200}
            >
                <input ref={previewImageRef} onChange={handlePickerImage} type="file" accept="image/*" name='avatar' id='avatar_picker' style={{ display: 'none' }} />
                <Box
                    backgroundColor='#1E1E1E20'
                    width={200} height={200} borderRadius={20}
                >
                    <Image objectFit='cover' borderWidth={0} src={previewImage ? previewImage : PlaceholderImage} width={200} height={200} borderRadius={20} zIndex={10} />
                </Box>
                <Stack
                    position='absolute'
                    right={2}
                    bottom={2}
                    borderRadius={30}
                    backgroundColor='#FFF'
                    cursor='pointer'
                    boxShadow='2xl'
                    onClick={() => previewImageRef?.current.click()}
                >
                    {
                        isLoadingThumbnail ?
                            <Spinner /> :
                            <CameraIcon color='#1E1E1E' width={30} height={30} />
                    }
                </Stack>
            </Box>
            <Flex
                flexDirection='row'
                columnGap={3}
            >
            </Flex>
        </Flex>
    );
}