import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";


/*
react router(URL matching, http requset)를 사용해서 
페이지를 reload하는 대신 component끼리 swapping하여 SPA 적용
*/

//BrowserRouter: browse's history object and keeps and track of the states


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App /> 
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
