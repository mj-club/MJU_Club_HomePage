import React from 'react';
import SEO from '../../components/SEO';
import Header from "../../partials/header/Header";
import Breadcrumb from '../../container/Breadcrumb/Breadcrumb';
import UnionNoticeContainer from "../../container/Union/UnionNotice";
import Footer from '../../container/Footer/Footer';
import ScrollToTop from '../../components/ScrollToTop.jsx';


const UnionNotice = () => {
    return (
        <React.Fragment>
            <SEO title="Exomac || UnionNotice" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-two.jpg"
                title="We work with bold brands that we believe in"
                content="Home"
                contentTwo="UnionNotice"
            />
            <UnionNoticeContainer />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default UnionNotice;