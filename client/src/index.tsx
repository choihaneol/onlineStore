import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';
import { fetchProductsAsync } from './features/catalog/catalogSlice';
   
/*
react router(URL matching, http requset)를 사용해서 
페이지를 reload하는 대신 component끼리 swapping하여 SPA 적용
*/
  
//BrowserRouter: browse's history object and keeps and track of the states
export const history: any = createBrowserHistory(); 

store.dispatch(fetchProductsAsync());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
     {/* <StoreProvider> StoreContext*/}
      <Provider store={store}>      
        <App /> 
      </Provider>
     {/* </StoreProvider> */}
    </HistoryRouter>
  </React.StrictMode>
);

reportWebVitals();
