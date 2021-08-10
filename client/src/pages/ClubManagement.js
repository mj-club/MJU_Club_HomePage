import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import ClubManagementMain from "../container/ClubManagement/ClubManagementMain";
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';

const ClubManagement = () => {
  return (
    <React.Fragment>
      <SEO title="Exomac || Management" />
      <Header />
      <ClubManagementMain/>
      <Footer />
      <ScrollToTop />
    </React.Fragment>
  )
}

export default ClubManagement;



