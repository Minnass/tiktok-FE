import React, { Fragment, ReactNode } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { AuthOverlay, LoadingBar,} from './components';

import { RootState,  } from './store/store';
import {  selectIsLoginRequest } from './store/auth'
import { useSelector,  } from 'react-redux';
import { selectIsLoading } from './store/loading';

function App() {
  const isLoading=useSelector((state:RootState)=>selectIsLoading(state))
  const isLoggedIRequest = useSelector((state: RootState) => selectIsLoginRequest(state));
  return (
      <>
      {isLoading&&<LoadingBar/>}
      <Router>
        <div className='App'>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={
                <>
                      {isLoggedIRequest&&<AuthOverlay />}
                      <Page></Page>
                </>
              } />
            })}
          </Routes>
        </div>
      </Router></>
  );
}

export default App;
