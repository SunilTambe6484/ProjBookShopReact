import React from 'react';

import './App.css';
import {BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './Routes';
import Menu from './Menu';
import AuthProvider from './auth/AuthProvider';
import configureInterceptor from './utilities/httpInterceptors';

configureInterceptor();


function AppRoutes()
{
return useRoutes(routes);
}


function App() {
  return (
    <>
      <>
      <AuthProvider>
      <Router>
    <div className='container'>
      <Menu />     
      <AppRoutes/>
     
    </div>
  </Router>
  </AuthProvider>
   
    </>
    </>
  );
}

export default App;
