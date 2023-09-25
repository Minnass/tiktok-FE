import React, { Fragment, ReactNode } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = route.layout;
            return <Route key={index} path={route.path} element={
              (Layout) ? <Layout><Page></Page></Layout> :
                <Fragment><Page></Page></Fragment>
            } />
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
