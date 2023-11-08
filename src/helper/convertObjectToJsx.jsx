import { Flex, Stack } from '@chakra-ui/react';
import { Pencil } from 'lucide-react';
import React from 'react';

export const convertObjectToJsx = (data) => {
    // Map the array of objects to an array of JSX elements
    return data.map((item, index) => {
        switch (item.tag) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6':
                return (
                    <Flex
                        flexDirection='row'
                        columnGap={1}
                        justifyContent='flex-start'
                        alignItems='center'
                    >
                        <Pencil size='14px' />
                        {
                            React.createElement(item.tag, { key: index }, item.content)
                        }
                    </Flex>
                );
            case 'p':
                return (
                    <Flex
                        flexDirection='row'
                        columnGap={1}
                        justifyContent='flex-start'
                        alignItems='flex-start'
                    >
                        <Stack marginTop={3}>
                            <Pencil size='14px'/>
                        </Stack>
                        <p style={{width: 'fit-content'}} key={index}>{item.content}</p>
                    </Flex>
                );
            case 'i':
                return (
                    <Flex
                        flexDirection='row'
                        columnGap={1}
                        justifyContent='flex-start'
                        alignItems='flex-start'
                    >
                        <Stack marginTop={3}>
                            <Pencil size='14px'/>
                        </Stack>
                        <i style={{width: 'fit-content'}} key={index}>{item.content}</i>
                    </Flex>
                );
            case 'u':
                return (
                    <Flex
                        flexDirection='row'
                        columnGap={1}
                        justifyContent='flex-start'
                        alignItems='flex-start'
                    >
                        <Stack marginTop={3}>
                            <Pencil size='14px'/>
                        </Stack>
                        <u style={{width: 'fit-content'}} key={index}>{item.content}</u>
                    </Flex>
                );
            case 'b':
                return (
                    <Flex
                        flexDirection='row'
                        columnGap={1}
                        justifyContent='flex-start'
                        alignItems='flex-start'
                    >
                        <Stack marginTop={3}>
                            <Pencil size='14px'/>
                        </Stack>
                        <b style={{width: 'fit-content'}} key={index}>{item.content}</b>
                    </Flex>
                );
            default:
                return null;
        }
    });
}
