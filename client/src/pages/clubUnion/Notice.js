import React from 'react';

import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';
import List from '../../components/Board/List';

export default function Notice() {
  return(
    <React.Fragment>
      <SEO title="Exomac – Business React JS Template" />
      <Header />
      <List/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  );
}