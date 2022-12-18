import React from 'react';
import Header from '../Header';
import { Outlet } from "react-router-dom";
import SearchLocation from '../SearchLocation';

const RootLayout = () => {
  return (
    <div>
      <Header />
      
      {/* <SearchLocation /> */}

      <Outlet />
    </div>
  );
};

export default RootLayout;