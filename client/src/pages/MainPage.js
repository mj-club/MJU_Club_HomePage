import React from 'react';
import { Container } from 'reactstrap';

import Navbar from '../components/Navbar';
import IntroSlider from '../containers/IntroSlider/IntroSlider';

import '../style/MainPage.css';

export default function MainPage() {
  return(
    <>
      <Navbar/>
      <IntroSlider/>
    </>
  );
}