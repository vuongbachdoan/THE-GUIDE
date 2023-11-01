import { Avatar, AvatarGroup, Box, Button, CheckboxIcon, Flex, FormControl, FormLabel, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Stack, Switch, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import PlaceholderImage from '../../../assets/images/placeholder-1.webp';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import icons from "../../../assets/icons";
const { CameraIcon } = icons;

export const DialogManageSubject = ({ canOpen, close, leave }) => {
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
                                    <InvitePeople />
                                }
                                {
                                    currentTab === 'Subject settings' &&
                                    <SubjectSettings />
                                }
                                {
                                    currentTab === 'Decorations' &&
                                    <Decoration />
                                }
                            </Flex>
                        </Flex>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

const InvitePeople = () => {
    return (
        <FormControl>
            <FormLabel>Email</FormLabel>
            <AvatarGroup size='sm' max={5} marginBottom={3}>
                <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />
                <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />
                <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
                <Avatar name='Prosper Otemuyiwa' src='https://bit.ly/prosper-baba' />
                <Avatar name='Christian Nwamba' src='https://bit.ly/code-beast' />
            </AvatarGroup>
            <InputGroup>
                <Input placeholder='example@email.com' fontSize='small' size='sm' borderRadius={10} />
                <InputRightElement>
                    <CheckboxIcon color='green.500' />
                </InputRightElement>
            </InputGroup>
            <Text marginTop={3} fontSize='x-small' color='gray.500'>Let invite other peoples to this subject and learn together!</Text>
        </FormControl>
    );
}

const SubjectSettings = () => {
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
                <Switch marginRight={3} colorScheme='orange' id='allow-join' />
                <FormLabel htmlFor='allow-join' mb='0'>
                    <Text fontSize='small'>Every one with link can join this subject?</Text>
                </FormLabel>
            </FormControl>
        </Flex>
    );
}

const Decoration = () => {
    const [isLoadingThumbnail, setIsLoadingThumbnail] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState(null);
    const previewImageRef = React.useRef();

    const handlePickerImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = async () => {
            setIsLoadingThumbnail(true);
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            const type = file.type.split('/')[1];

            // updateSubjectThumbnail(subjectCode, base64String, type)
            //     .then((res) => {
            //         setPreviewImage(res);
            //         setIsLoadingThumbnail(false);
            //     })
            //     .catch(() => {
            //         onOpen();
            //         setPreviewImage(null);
            //         setAlertMessage('Fail to upload this image!');
            //         setIsLoadingThumbnail(false);
            //     })

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
                <Image objectFit='cover' backgroundColor='#1E1E1E20' borderWidth={0} src={previewImage ? previewImage : PlaceholderImage} width={200} height={200} borderRadius={20} zIndex={10} />
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
                <Button color='green.500' width='40px' height='40px' variant='ghost' borderRadius={12} leftIcon={<AiOutlineCheck />} iconSpacing={0} />
                <Button color='red.500' width='40px' height='40px' variant='ghost' borderRadius={12} leftIcon={<AiOutlineClose />} iconSpacing={0} />
            </Flex>
        </Flex>
    );
}