import React, { useState, useEffect, useRef } from 'react';
import { Box, Text, Button, VStack, Input, Avatar, IconButton, Spacer, Flex, Heading, Stack, useColorModeValue } from '@chakra-ui/react';
import { BiMailSend } from 'react-icons/bi';

export const LivestreamChat = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');

    return (
        <Flex
            flexDirection="column"
            justifyContent="space-between"
            height='calc(100vh - 60px)'
            paddingY={15}
            paddingX={7.5}
        >
            {/* {renderMessages()} */}

            <Flex
                flexDirection='column'
                flex={1}
                overflow='hidden'
                rowGap={15}
                height='100%'
            >
                <Box>
                    <Heading textAlign='center' size='xs' textTransform='uppercase'>
                        Chat messages
                    </Heading>
                    <Text color='blackAlpha.500' textAlign='center' fontSize={12}>
                        Fell free to chat with other people
                    </Text>
                </Box>
                <Flex
                    flex={1}
                    overflowY='scroll'
                    flexDirection='column'
                    rowGap={15}
                    width='100%'
                >
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((item) => (
                            <Flex
                                width='100%'
                                flexDirection='row'
                                flexWrap={true}
                                columnGap={7.5}
                                alignItems='flex-start'
                                borderRadius={7.5}
                                _hover={{
                                    backgroundColor:'#000'
                                }}
                                cursor='pointer'
                                padding={7.5}
                            >
                                <Avatar
                                    size='xs'
                                    name='Kola Tioluwani'
                                    src='https://bit.ly/tioluwani-kolawole'
                                />
                                <Flex
                                    flexDirection='column'
                                    rowGap={0}
                                    justifyContent='flex-start'
                                >
                                    <Text fontSize={12} fontWeight='semibold' textAlign='left'>
                                        DE150256 - 2 minutes
                                    </Text>
                                    <Text fontSize={12}>
                                        Check out the overview of your clients.
                                    </Text>
                                </Flex>
                            </Flex>
                        ))
                    }
                </Flex>
            </Flex>

            <Flex
                flexDirection='row'
                columnGap={15}
                alignItems='flex-end'
                marginTop={15}
            >
                <Input
                    // value={message}
                    // onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    required={true}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            // sendMessage()
                        }
                    }}
                />
                <Button backgroundColor="#FF8F46" _hover={{backgroundColor: "#FF8F46"}} width='40px' height='40px' padding={0}>
                    <BiMailSend size={22} />
                </Button>
            </Flex>
        </Flex>
    );
};