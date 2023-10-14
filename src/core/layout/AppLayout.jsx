
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { AppHeader } from "./components/AppHeader";
import { Sidebar } from "./components/Sidebar";

export const AppLayout = () => {
    return (
        <VStack
            width='100%'
            height='100%'
        >
            <Flex
                flexDirection='column'
                width='100%'
                height='100vh'
                overflow='hidden'
                position='fixed'
                top={0}
                left={0}
            >
                <Box height='80px'>
                    <AppHeader />
                </Box>
                <Flex
                    flex={1}
                    flexDirection='row'
                    height='calc(100vh - 80px)'
                >
                    <VStack
                        style={{
                            height: 'calc(100vh - 80px)',
                            overflowY: 'scroll',
                            overflowX: 'hidden',
                            scrollbarColor: 'transparent'
                        }}
                        className='sidebar'
                    >
                        <Sidebar />
                    </VStack>
                    <VStack
                        overflowY='scroll'
                        height='100%'
                        flex={1}
                    >
                        <Text>Hiii</Text>
                    </VStack>
                </Flex>
            </Flex>
        </VStack>
    );
}