import { Box, Button, Flex, Input, InputGroup, InputRightElement, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { AppLayout } from "../../core/layout/AppLayout";
import { Sidebar } from "../../core/layout/components/Sidebar";
import { SubjectsPanel } from "./components/SubjectsPanel";
import icons from "../../assets/icons";
import { PostCard } from "./components/PostCard";
const { CameraIcon } = icons;

export const Home = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');

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
                        <Box
                            bg={bg}
                            width='100%'
                            padding={6}
                            borderRadius={20}
                        >
                            <Flex
                                flexDirection='row'
                                justifyContent='space-between'
                                alignItems='center'
                                columnGap={15}
                            >
                                <Text fontSize='sm' fontWeight='semibold' color='gray.500'>Create your post now . . .</Text>
                                <Button backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Create post</Button>
                            </Flex>
                            
                        </Box>

                        <PostCard />
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