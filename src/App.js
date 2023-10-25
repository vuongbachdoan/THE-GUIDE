import React from 'react';
import {
  ChakraProvider,
  Flex,
  Stack,
  extendTheme
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './config/theme/darkmode/ColorModeSwitcher';
import AppRouting from './config/router/AppRouting';
import './config/theme/css/default.css';
import { mode } from '@chakra-ui/theme-tools';
import useAuth from './hooks/useAuth';

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#F5F5F5')(props),
      }
    })
  }
});

function App() {
  useAuth();

  return (
    <ChakraProvider theme={theme}>
      <Flex justifyContent='center' alignItems='center' width='100%' height='100vh' overflow='hidden' textAlign="center" fontSize="xl">
        <AppRouting />
        <Stack position='fixed' bottom={3} right={3}><ColorModeSwitcher initialColorMode={theme.config.initialColorMode} justifySelf="flex-end" borderRadius={20} /></Stack>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
