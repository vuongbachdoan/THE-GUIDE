import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Text, Textarea, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import icons from '../../../assets/icons';
import { FaChevronDown } from 'react-icons/fa';
const { HeartIcon, CommentIcon, ShareIcon, EyeIcon, SyncIcon } = icons;

export const PanelCreatePost = () => {
    const color = useColorModeValue('#1E1E1E', '#FFF');
    const placeholderColor = useColorModeValue('gray.500', 'gray.400')

    return (
        <Card
            borderWidth={0}
            borderRadius={20}
            boxShadow='none'
            width='100%'
        >
            <Box marginTop={6} marginX={6}>
                <Text textAlign='left' fontSize='xl' fontWeight='semibold'>Create Post</Text>
            </Box>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' columnGap={3}>
                        <Avatar name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />

                        <Flex
                            flex={1}
                            flexDirection='column'
                            rowGap={1}
                        >
                            <Flex columnGap={3} width='100%' flexDirection='row' alignItems='center'>
                                <Input padding={1} color={color} _placeholder={{color: placeholderColor}} height={22} htmlSize={5} width={100} borderWidth={0} _focus={{ borderWidth: 0, boxShadow: 'none' }} outline='none' fontWeight='semibold' textAlign='left' placeholder='Subject' />
                                <Text cursor='default'>/</Text>
                                <Input padding={1} color={color} _placeholder={{color: placeholderColor}} height={22} borderWidth={0} _focus={{ borderWidth: 0, boxShadow: 'none' }} outline='none' fontWeight='semibold' textAlign='left' placeholder='Subject Name' />
                            </Flex>
                            <Menu>
                                <MenuButton width='fit-content' as={Button} padding={1} height='fit-content' rightIcon={<FaChevronDown size={12}/>}>
                                    <Text fontSize='sm'>Department</Text>
                                </MenuButton>
                                <MenuList
                                    padding={1}
                                    borderRadius={12}
                                    boxShadow='xl'
                                    minWidth='fit-content'
                                >
                                    <MenuItem borderWidth={0} fontSize='sm' borderRadius={8}>Information Technology</MenuItem>
                                    <MenuItem borderWidth={0} fontSize='sm' borderRadius={8}>Bussiness</MenuItem>
                                    <MenuItem borderWidth={0} fontSize='sm' borderRadius={8}>Digital art</MenuItem>
                                </MenuList>
                            </Menu>
                        </Flex>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Box
                    height={240}
                    borderRadius={15}
                    overflow='hidden'
                    backgroundColor='#CCCCCC30'
                    marginBottom={3}
                    position='relative'
                >
                    <Image width='100%' height='100%' objectFit='cover' src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80' />
                    <Stack
                        position='absolute'
                        bottom={3}
                        right={3}
                    >
                        <Button display='flex' justifyContent='center' alignItems='center' padding={0} iconSpacing={0} rightIcon={<SyncIcon width={18} height={18} color='#1E1E1E' />} borderRadius='full' />
                    </Stack>
                </Box>
                <Textarea borderRadius={15} minHeight={240} placeholder='Content of your post here . . .' />
            </CardBody>

            <CardFooter
                justifyContent='flex-end'
                flexWrap='wrap'
                columnGap={3}
                sx={{
                    '& > button': {
                        minW: '72px',
                    },
                }}
            >
                <Button borderRadius={15}>Draft</Button>
                <Button borderRadius={15} backgroundColor='#FF8F46' _hover={{ backgroundColor: '#E86C1C' }} color='white'>Publish</Button>
            </CardFooter>
        </Card>
    );
}