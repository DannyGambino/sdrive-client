import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Repairs } from "./components/views/Repairs";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Repairs />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
