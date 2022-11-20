import React from 'react';
import { Footer } from 'components/footer';

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      {children}

      <Footer />
    </>
  );
};
