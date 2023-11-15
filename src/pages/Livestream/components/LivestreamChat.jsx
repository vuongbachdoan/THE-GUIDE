import { ChatRoom } from 'amazon-ivs-chat-messaging';
import React from 'react';
import { Avatar, Button, Flex, Heading, Input, Text, useColorModeValue } from '@chakra-ui/react';
import { BiMailSend } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { convertTimestamp } from '../../../helper/convertTimestamp';
import { generateChatKey } from '../../../core/services/chat';

export const LivestreamChat = () => {
    const [room, setRoom] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const user = useSelector((state) => state.profileData.data);
    const [messages, setMessages] = React.useState([]);

    const tokenProvider = async () => {
        const data = {
            "token_params": {
                "attributes": {
                    "username": user?.username,
                    "avatar": user?.avatar
                },
                "capabilities": [
                    "SEND_MESSAGE",
                    "DELETE_MESSAGE",
                    "DISCONNECT_USER"
                ],
                "roomIdentifier": process.env.REACT_APP_CHAT_ROOM_ID,
                "userId": user?.id
            }
        };

        var token;
        try {
            const response = await generateChatKey(data);
            token = {
                token: response.token,
                sessionExpirationTime: new Date(response.sessionExpirationTime),
                tokenExpirationTime: new Date(response.tokenExpirationTime),
            };
        } catch (error) {
            console.error('Error:', error);
        }

        return token;
    };

    React.useEffect(() => {
        if (user?.id) {
            const room = new ChatRoom({
                regionOrUrl: 'us-east-1',
                tokenProvider: () => tokenProvider()
            });
            setRoom(room);
            room.connect();

            room.addListener('message', (message) => {
                setMessages(prev => [...prev, message]);
            });
        }
    }, [user]);

    const handleSendMessage = () => {
        const payload = {
            "action": "SEND_MESSAGE",
            "requestId": user?.id,
            "content": message
        }
        room.sendMessage(payload);
    }

    return (
        <Flex
            flexDirection='column'
            height='100%'
        >
            <Flex height='50px' alignItems='center' width='100%' margin={3}>
                <Heading fontSize='medium' textAlign='center'>Chat room</Heading>
            </Flex>
            <Flex  margin={3} height='calc(100vh - 150px)' overflowY='scroll' flex={1} flexDirection='column' alignItems='flex-start' rowGap={2}>
                {
                    messages.map((message) => (
                        <ChatMessage data={message} />
                    ))
                }
            </Flex>
            {
                user &&
                <Flex flexDirection='row' columnGap={3} height='100px' alignItems='center' margin={3}>
                    <Input
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage()
                            }
                        }} value={message} borderRadius='10px' onChange={(e) => setMessage(e.target.value)} />
                    <Button
                        backgroundColor='#FF8F46'
                        _hover={{ backgroundColor: '#FF8F46' }}
                        borderRadius={10}
                        leftIcon={<BiMailSend />}
                        iconSpacing={0}
                        onClick={handleSendMessage}
                        cursor='pointer'
                    />
                </Flex>
            }
        </Flex>
    );
};

const ChatMessage = ({ data }) => {
    const chatBg = useColorModeValue('gray.100', 'gray.800');
    const chatText = useColorModeValue('#000', '#FFF');

    return (
        <Flex columnGap={3} flexDirection='row' alignItems='flex-end' width='100%'>
            <Avatar size='sm' src={data?.sender?.attributes?.avatar} />
            <Flex flex={1} paddingX={2} paddingY={1} backgroundColor={chatBg} borderRadius={10} flexDirection='column' alignItems='flex-start'>
                <Text color={chatText} fontSize='small' fontWeight='semibold'>{data?.sender?.attributes?.username} - {convertTimestamp(data?.sendTime)}</Text>
                <Text color={chatText} textAlign='left' fontSize='x-small' fontWeight='normal'>{data?.content}</Text>
            </Flex>
        </Flex>
    );
}




