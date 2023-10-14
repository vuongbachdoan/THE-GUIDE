import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Stack, Text, VStack } from "@chakra-ui/react"
import icons from "../../../assets/icons";
const { HomeIcon, PostIcon, ProfileIcon, SubjectIcon, NotificationIcon } = icons;

export const Sidebar = () => {
    return (
        <Flex
            flexDirection='column'
            height='100%'
        >
            <Box
            >
                <Box
                    width={285}
                    margin={6}
                    backgroundColor='#FFF'
                    borderRadius={20}
                    padding={30}
                >
                    <Accordion defaultIndex={[0]} allowMultiple border='none'>
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#FF8F46'><HomeIcon width={40} height={40} color='#FF8F46' /> Home</AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'><SubjectIcon width={40} height={40} color='#A0A0A0' /> Subject</AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'><PostIcon width={40} height={40} color='#A0A0A0' /> Post</AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'
                                position='relative'
                            >
                                <NotificationIcon width={40} height={40} color='#A0A0A0' />
                                <Stack
                                    position='absolute'
                                    top='9px'
                                    left='39px'
                                    width='16px'
                                >
                                    <Text color='#FFF' fontSize='x-small' fontWeight='bold'>99</Text>
                                </Stack>
                                Notification
                            </AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'><ProfileIcon width={40} height={40} color='#A0A0A0' /> Profile</AccordionButton>
                        </AccordionItem >
                    </Accordion>
                </Box>

                <Box
                    width={285}
                    margin={6}
                    backgroundColor='#FFF'
                    borderRadius={20}
                    padding={30}
                >
                    <Accordion defaultIndex={[0]} allowMultiple border='none'>
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#FF8F46'><HomeIcon width={40} height={40} color='#FF8F46' /> Home</AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'><SubjectIcon width={40} height={40} color='#A0A0A0' /> Subject</AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'><PostIcon width={40} height={40} color='#A0A0A0' /> Post</AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'
                                position='relative'
                            >
                                <NotificationIcon width={40} height={40} color='#A0A0A0' />
                                <Stack
                                    position='absolute'
                                    top='9px'
                                    left='39px'
                                    width='16px'
                                >
                                    <Text color='#FFF' fontSize='x-small' fontWeight='bold'>99</Text>
                                </Stack>
                                Notification
                            </AccordionButton>
                        </AccordionItem >
                        <AccordionItem border='none' borderRadius={15} overflow='hidden'>
                            <AccordionButton color='#A0A0A0'><ProfileIcon width={40} height={40} color='#A0A0A0' /> Profile</AccordionButton>
                        </AccordionItem >
                    </Accordion>
                </Box>
            </Box>
        </Flex>
    );
}