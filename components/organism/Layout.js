import React from 'react';
import Header from './Header';
import Navbar from '../molekul/Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <main className="">
      <Header>
        <Navbar />
      </Header>
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
