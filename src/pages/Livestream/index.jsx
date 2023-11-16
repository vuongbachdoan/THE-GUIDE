import { Box, Button, Flex, Input, InputGroup, InputRightElement, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Stack, Text, VStack, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import IVSBroadcastClient, { BASIC_LANDSCAPE } from 'amazon-ivs-web-broadcast'
import React, { useEffect, useState } from 'react';
import { MdCallEnd, MdVideocamOff, MdVideocam, MdSettings } from 'react-icons/md';
import { IoMdMicOff, IoMdMic } from 'react-icons/io';
import { LivestreamChat } from './components/LivestreamChat';
import { HostPlayer } from './components/HostPlayer';
import { Outlet } from 'react-router-dom';

export const Livestream = () => {
    const [client, setClient] = useState(null);
    const bg = useColorModeValue('#FFF', 'gray.700');
    const bgPlayer = useColorModeValue('gray.100', 'gray.900');
    const [currentTab, setCurrentTab] = React.useState('Audio');
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isAllowedAudio, setIsAllowedAudio] = React.useState(false);
    const [isAllowedVideo, setIsAllowedVideo] = React.useState(false);
    const [currentAudioDevice, setCurrentAudioDevice] = React.useState(null);
    const [currentVideoDevice, setCurrentVideoDevice] = React.useState(null);
    const [keyJoin, setKeyJoin] = React.useState(null);
    const { isOpen: isOpenAlert, onOpen: onOpenAlert, onClose: onCloseAlert } = useDisclosure();
    const [alertMessage, setAlertMessage] = React.useState(null);

    return (
        <>
            <Box
                overflow='hidden'
                width='100%'
                height='100vh'
            >
                <Flex
                    flexDirection='row'
                    width='100%'
                    height='100vh'
                >
                    <Flex
                        height='100vh'
                        flex={1}
                    >
                        <Outlet />
                    </Flex>

                    <Flex width={320}>
                        <LivestreamChat />
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
