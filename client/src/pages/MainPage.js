import React from 'react';
import { Container } from 'reactstrap';

import Navbar from '../components/Navbar';
import IntroSlider from '../containers/IntroSlider/IntroSlider';

export default function MainPage() {
  return(
    <>
      <Navbar/>
      <IntroSlider/>
    </>
  );
}