import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from '../../../assets/images/google_logo.png';
import { Auth } from "aws-amplify";

export const SignIn = () => {
    const navigate = useNavigate();

    return (
        <>
            <Flex
                flexDirection='column'
                alignItems='center'
            >
                <Text marginBottom={30} fontWeight='semibold' fontSize='2xl'>Welcome the The Guide 🎉</Text>

                <Flex
                    flexDirection='row'
                    columnGap={30}
                >
                    <Text>By click Login, you agree with our <Link to='policy'><Text textDecoration='underline'>Privacy policy</Text></Link></Text>
                </Flex>

                <Button onClick={() => Auth.federatedSignIn({ provider:"Google" })} marginTop={30} borderRadius={15} size='lg' backgroundColor='#1E1E1E' _hover={{backgroundColor: '#000'}}>
                    <Image src={GoogleLogo} marginRight={15}/>
                    <Text color='#FAFAFA' fontSize='md' fontWeight='semibold'>Login with Google</Text>
                </Button>
            </Flex>
        </>
    );
}