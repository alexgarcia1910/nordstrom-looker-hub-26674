import React from 'react';
import { createRoot } from 'react-dom/client';
import { ExtensionProvider40 } from '@looker/extension-sdk-react';
import { ComponentsProvider } from '@looker/components';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ExtensionProvider40>
      <ComponentsProvider>
        <App />
      </ComponentsProvider>
    </ExtensionProvider40>
  </React.StrictMode>
);
