import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import icons from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
const { NotFoundIcon } = icons;

export const Error = () => {
    const navigate = useNavigate();
    const fill = useColorModeValue('#353642', '#FFF')

    return (
        <Flex
            width='100%'
            height='100vh'
            overflow='hidden'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
        >
            <NotFoundIcon width={300} height={300} color={fill}/>
            <Button onClick={() => navigate(-1)} backgroundColor='#FF8F46' borderRadius={15} _hover={{ backgroundColor: '#E86C1C' }} color='white'>Go back</Button>
        </Flex>
    );
}