'use client'

import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Button,
    Image,
    Icon,
    IconButton,
    createIcon,
    IconProps,
    useColorModeValue,
} from '@chakra-ui/react';
import Banner from '../../../assets/images/banner.png';
import { ArrowBigRight } from 'lucide-react';
import { registerEvent } from '../../../core/services/livestream';
import { useSelector } from 'react-redux';

export const EventView = () => {
    const user = useSelector((state) => state.profileData.data);
    const handleRegister = () => {
        if (user) {
            registerEvent({
                "recipients": [
                    { "name": user?.username, "email": user?.email }
                ]
            })
                .then((res) => {
                    alert('Please check your email.');
                })
                .catch((err) => {
                    alert('Fail to register this event.');
                })
        }
    }

    return (
        <Flex width='100%' flexDirection={{ base: 'column-reverse', lg: 'row' }} flexWrap='wrap' height='100vh' overflow='hidden' position='relative' alignItems='center'>
            <Image
                alt={'Hero Image'}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={'100%'}
                src={Banner}
                position='absolute'
                top={0}
                left={0}
                filter='brightness(50%)'
            />
            <Box flex={1} zIndex={10} filter='brightness(100%)' marginY={3}>
                <Heading color='#FFF' fontWeight='semibold'>The Guide event : My Architecture</Heading>
                <Button
                    rounded='full'
                    size='lg'
                    padding={3}
                    marginTop={3}
                    fontWeight='semibold'
                    backgroundColor='#FF8F46'
                    _hover={{
                        backgroundColor: '#FF8F46'
                    }}
                    onClick={handleRegister}
                    rightIcon={<Flex width='32px' justifyContent='center' alignItems='center' height='32px' rounded='full' backgroundColor='#000'><ArrowBigRight color='#FFF' width={20} height={20} /></Flex>}>
                    <Text marginX={3}>Register Event</Text>
                </Button>
            </Box>
            <Box
                flex={1}
                position={'relative'}
                height={'300px'}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}
                display={{
                    base: 'none',
                    lg: 'block'
                }}
                mx={3}
            >
                <Image
                    alt={'Hero Image'}
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    h={'100%'}
                    src={Banner}
                    position='absolute'
                    top={0}
                    left={0}
                />
            </Box>
        </Flex>
    )
}