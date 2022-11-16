import React from 'react';
import { Header } from 'components/header';
import { Footer } from 'components/footer';

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />

      {children}

      <Footer />
    </>
  );
};
