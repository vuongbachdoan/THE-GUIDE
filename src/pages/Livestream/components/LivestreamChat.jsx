import { ChatRoom } from 'amazon-ivs-chat-messaging';
import React from 'react';
import { Avatar, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
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
            margin={3}
            height='100%'
        >
            <Heading fontSize='medium'>Chat room</Heading>
            <Flex marginTop={3} flex={1} flexDirection='column' alignItems='flex-start' rowGap={1}>
                {
                    messages.map((message) => (
                        <ChatMessage data={message}/>
                    ))
                }
            </Flex>
            {
                user &&
                <Flex flexDirection='row' columnGap={3}>
                    <Input value={message} borderRadius='10px' onChange={(e) => setMessage(e.target.value)} />
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
    return (
        <Flex columnGap={3} flexDirection='row' alignItems='flex-end'>
            <Avatar size='sm' src={data?.sender?.attributes?.avatar}/>
            <Flex paddingX={2} paddingY={1} backgroundColor='gray.100' borderRadius={10} flexDirection='column' alignItems='flex-start'>
                <Text fontSize='small' fontWeight='semibold'>{data?.sender?.attributes?.username} - {convertTimestamp(data?.sendTime)}</Text>
                <Text textAlign='left' fontSize='x-small' fontWeight='medium'>{data?.content}</Text>
            </Flex>
        </Flex>
    );
}




