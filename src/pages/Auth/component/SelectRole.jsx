import { Box, Button, Flex, Image, Text, useColorModeValue } from "@chakra-ui/react";
import Student1 from '../../../assets/images/student1.png';
import Lecture1 from '../../../assets/images/lecture1.png';
import DecorRoleOrange from '../../../assets/images/decor_role_orange.png'
import DecorRoleGreen from '../../../assets/images/decor_role_green.png'
import React from "react";
import { useNavigate } from "react-router-dom";

export const SelectRole = () => {
    const bg = useColorModeValue('#FFF', 'gray.700');
    const navigate = useNavigate();
    const [isStudentSelected, setIsStudentSelected] = React.useState(true);

    return (
        <Flex
            flexDirection='column'
            alignItems='center'
        >
            <Text marginBottom={30} fontWeight='semibold' fontSize='2xl'>Which role is similar to you ?</Text>

            <Flex
                flexDirection='row'
                columnGap={30}
            >
                <Box
                    bg={bg}
                    borderWidth={0.5}
                    borderColor={isStudentSelected ? '#FF8F46' : 'transparent'}
                    opacity={isStudentSelected ? 1 : 0.5}
                    borderRadius={28}
                    width='fit-content'
                    height='fit-content'
                    cursor='pointer'
                    onClick={() => setIsStudentSelected(true)}
                >
                    <Flex
                        justifyContent='center'
                        alignItems='center'
                        position='relative'
                        margin='20px'
                        width={250}
                        height={250}
                        flexDirection='column'
                    >
                        <Image src={DecorRoleOrange}
                            position='absolute'
                            top={0}
                            left={0}
                            width='100%'
                        />
                        <Image src={Student1} width={100} height={100} borderRadius={14} zIndex={10} />
                        <Text marginTop={3} fontWeight='semibold' fontSize='md'>I am Student</Text>
                    </Flex>
                </Box>
                <Box
                    bg={bg}
                    borderWidth={0.5}
                    borderColor={!isStudentSelected ? '#45CE7B' : 'transparent'}
                    opacity={!isStudentSelected ? 1 : 0.5}
                    borderRadius={28}
                    width='fit-content'
                    height='fit-content'
                    cursor='pointer'
                    onClick={() => setIsStudentSelected(false)}
                >
                    <Flex
                        justifyContent='center'
                        alignItems='center'
                        position='relative'
                        margin='20px'
                        width={250}
                        height={250}
                        flexDirection='column'
                    >
                        <Image src={DecorRoleGreen}
                            position='absolute'
                            top={0}
                            left={0}
                            width='100%'
                        />
                        <Image src={Lecture1} width={100} height={100} borderRadius={14} zIndex={10} />
                        <Text marginTop={3} fontWeight='semibold' fontSize='md'>I am Lecture</Text>
                    </Flex>
                </Box>
            </Flex>

            <Button onClick={() => navigate('login')} marginTop={30} borderRadius={15} size='lg' backgroundColor={isStudentSelected ? "#FF8F46" : '#45CE7B'} _hover={{ backgroundColor: isStudentSelected ? '#E86C1C' : '#20B65B' }}>Next</Button>
        </Flex>
    );
}