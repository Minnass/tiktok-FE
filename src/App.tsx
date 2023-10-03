import React, { Fragment, ReactNode } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { AuthOverlay,} from './components';

import { RootState,  } from './store/store';
import {  selectIsLoginRequest } from './store/auth'
import { useSelector,  } from 'react-redux';

function App() {
  const isLoggedIRequest = useSelector((state: RootState) => selectIsLoginRequest(state));
  return (
    <>
      {isLoggedIRequest&&<AuthOverlay />}
      <Router>
        <div className='App'>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={
                <Page></Page>
              } />
            })}
          </Routes>
        </div>
      </Router>
     
    </>

  );
}

export default App;
