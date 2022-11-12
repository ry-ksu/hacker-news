import React from 'react';
import { Header } from 'components/header';
import { Footer } from 'components/footer';

type ILayoutProps = {
  children: JSX.Element;
};

export const Layout = (props: ILayoutProps) => {
  return (
    <>
      <Header />

      {props.children}

      <Footer />
    </>
  );
};
