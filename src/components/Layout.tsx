import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Main from './MainContent';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow h-full overflow-hidden">
        <Navbar />
        <Main>
          <Outlet/>
        </Main>
      </div>
    </div>
  );
};

export default Layout;
