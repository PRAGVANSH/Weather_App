import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'

const val = document.getElementById("root")
const root = ReactDOM.createRoot(val);


root.render(<React.StrictMode>
            <App/>
           </React.StrictMode>)