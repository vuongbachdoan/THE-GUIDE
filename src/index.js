import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorker from './config/serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports';
Amplify.configure(JSON.parse(process.env.REACT_APP_AMPLIFY_CREDENTIALS));

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ColorModeScript />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

serviceWorker.unregister();