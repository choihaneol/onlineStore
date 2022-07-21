import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
/*
react router(URL matching, http requset)를 사용해서 
페이지를 reload하는 대신 component끼리 swapping하여 SPA 적용
*/

//BrowserRouter: browse's history object and keeps and track of the states
export const history: any = createBrowserHistory(); 



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App /> 
    </HistoryRouter>
  </React.StrictMode>
);

reportWebVitals();
