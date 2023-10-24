import { Box, Button, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { PostCard } from './PostCard';
import { useNavigate } from 'react-router-dom';
import { NotificationCard } from './NotificationCard';
import { notifications } from '../../../mocks/data';

export const PanelNotification = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const navigate = useNavigate();

    return (
        <>

            <Box
                bg={bg}
                width='100%'
                padding={6}
                borderRadius={20}
            >
                <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Notifications</Text>
            </Box>
            <Flex
                flexDirection='column'
                rowGap={3}
                width='100%'
            >
                {
                    notifications.map((notification) => (
                        <NotificationCard key={notification.id} data={notification} />
                    ))
                }
            </Flex>
        </>
    );
}