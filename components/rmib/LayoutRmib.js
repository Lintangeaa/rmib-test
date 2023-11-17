import React from 'react';
import Header from '../organism/Header';
import Footer from '../organism/Footer';

const LayoutRmib = ({ children }) => {
  return (
    <main className="h-screen bg-white">
      <Header>
        <button className="font-bold bg-white rounded-lg w-36 h-11 text-primary">
          RMIB
        </button>
      </Header>
      <fieldset className="bg-white">{children}</fieldset>
    </main>
  );
};

export default LayoutRmib;
