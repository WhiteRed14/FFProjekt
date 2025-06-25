import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './warsztat/src/styles/main.css';
import './warsztat/src/styles/style.css';
import './warsztat/src/styles/styles1.css';
import './warsztat/src/styles/update.css';
import './warsztat/src/styles/more-info.css';
import './warsztat/src/index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />); 