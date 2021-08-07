import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';
import IdFind from '../container/LogIn/IdFind';
const Idfind = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Login" />
      <Header />
      <IdFind />
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default Idfind;



