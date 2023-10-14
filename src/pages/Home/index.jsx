import { Flex, Text, VStack } from "@chakra-ui/react";
import { AppLayout } from "../../core/layout/AppLayout";
import { Sidebar } from "../../core/layout/components/Sidebar";
import { SubjectsPanel } from "./components/SubjectsPanel";

export const Home = () => {
    return (
        <AppLayout
            components = {
                <Flex
                    flex={1}
                    flexDirection='row'
                    height='calc(100vh - 80px)'
                    columnGap={6}
                    margin={6}
                >
                    <VStack
                        style={{
                            height: 'calc(100vh - 80px)',
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}
                        className='scrollbar-hide'
                    >
                        <Sidebar />
                    </VStack>

                    <VStack
                        overflowY='scroll'
                        height='100%'
                        flex={1}
                        className='scrollbar-hide'
                    >
                        <Text>Hiii</Text>
                    </VStack>

                    <VStack
                        style={{
                            height: 'calc(100vh - 80px)',
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}
                        className='scrollbar-hide'
                    >
                        <SubjectsPanel />
                    </VStack>

                    <VStack
                        style={{
                            height: 'calc(100vh - 80px)',
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}
                        className='scrollbar-hide'
                    >
                        <Sidebar />
                    </VStack>
                </Flex>
            }
        />
    );
}