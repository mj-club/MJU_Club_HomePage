import React from 'react';
import SEO from '../components/SEO';
import Header from "../partials/header/Header";
import Breadcrumb from '../container/Breadcrumb/Breadcrumb';
import Table from '../components/Table/Table';
import CallToAction from '../container/CallToAction/CallToAction';
import AboutFive from '../container/About/AboutFive';
import BrandContainer from '../container/Brand/BrandContainer';
import Faq from '../container/Faq/Faq';
import Footer from '../container/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop.jsx';


const Question = () => {
    return (
        <React.Fragment>
            <SEO title="Exomac || Work" />
            <Header />
            <Breadcrumb 
                image="images/bg/breadcrumb-bg-two.jpg"
                title="We work with bold brands that we believe in"
                content="Home"
                contentTwo="Q&A"
            />
            <Table/>
            <CallToAction />
            <AboutFive />
            <BrandContainer classOption="section-padding-bottom" />
            <Faq />
            <Footer />
            <ScrollToTop />
        </React.Fragment>
    )
}

export default Question;