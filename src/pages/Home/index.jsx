import { Flex, Text, VStack } from "@chakra-ui/react";
import { AppLayout } from "../../core/layout/AppLayout";
import { Sidebar } from "../../core/layout/components/Sidebar";
import { SubjectsPanel } from "./components/SubjectsPanel";
import { TrendingPanel } from "./components/TrendingPanel";

export const Home = () => {
    return (
        <AppLayout
            components={
                <Flex
                    flex={1}
                    flexDirection='row'
                    columnGap={3}
                    margin={3}
                >
                    <VStack
                        style={{
                            height: 'calc(100vh - 110px)',
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}
                        className='scrollbar-hide'
                    >
                        <Sidebar />
                    </VStack>

                    <VStack
                        flex={1}
                        style={{
                            height: 'calc(100vh - 110px)',
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}
                        className='scrollbar-hide'
                    >
                        <Text>Hiii</Text>
                    </VStack>

                    <VStack
                        style={{
                            height: 'calc(100vh - 110px)',
                            overflowY: 'scroll',
                            overflowX: 'hidden'
                        }}
                        className='scrollbar-hide'
                    >
                        <SubjectsPanel />
                    </VStack>
                </Flex>
            }
        />
    );
}