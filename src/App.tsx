import React, { Fragment, ReactNode, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { AuthOverlay, LoadingBar, } from './components';

import { RootState, } from './store/store';
import { selectIsLoggedIn, selectIsLoginRequest, setLoggedIn } from './store/auth'
import { useDispatch, useSelector, } from 'react-redux';
import { selectIsLoading } from './store/loading';
import { getUserInfo } from './service/userService';
import axiosInstance from './aixos/axios';
import { setLikedVideos } from './store/likedVideos';
import { setFollowing } from './store/following';
import VideoSearch from './pages/searchPage/videoSearch';
import AccountSearch from './pages/searchPage/accountSearch';
import { setSearchs } from './store/search';
import SearchService from './service/searchService';

function App() {
  const isLoading = useSelector((state: RootState) => selectIsLoading(state))
  const isLoggedIRequest = useSelector((state: RootState) => selectIsLoginRequest(state));
  const userInfo = getUserInfo();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => selectIsLoggedIn(state));
  if (userInfo != null) {
    dispatch(setLoggedIn());
  }
  useEffect(() => {
    if (isLoggedIn) {
      axiosInstance.get(`Like/getLikedVideo/${userInfo?.userId}`)
        .then(
          (response) => {
            dispatch(setLikedVideos(response.data.data))
          }
        )
        .catch((error) => {
        })
      axiosInstance.get(`Follow/GetFollowing/${userInfo?.userId}`)
        .then((response) => {
          dispatch(setFollowing(response.data.data))
        })
        .catch((error) => {
          console.log('Get followers faced error');
        })
      SearchService.getAllKeyWords(userInfo?.userId!)
        .then((data) => {
          dispatch(setSearchs(data))
        })
        .catch((error) => { console.log(error) })
    }
  }, [isLoggedIn])

  return (
    <>
      {isLoading && <LoadingBar />}
      <Router>
        <div className='App'>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const parts = route.path.split('/');
              const cleanedParts = parts.slice(1);
              const firstPart = cleanedParts[0];
              const secondPart = cleanedParts[1];
              if (firstPart === "search") {
                return <Route key={index} path={`/${firstPart}`}
                  element={<> {isLoggedIRequest && <AuthOverlay />}
                    <Page></Page></>}
                >
                  <Route path={secondPart} element={(secondPart === "user") ? (<AccountSearch />) : (<VideoSearch />)} />
                </Route>
              }
              else {
                return <Route key={index} path={route.path} element={
                  <>
                    {isLoggedIRequest && <AuthOverlay />}
                    <Page></Page>
                  </>
                } />
              }

            })}
          </Routes>
        </div>
      </Router></>
  );
}

export default App;
