import React from 'react';
import { Container } from 'reactstrap';

import Navbar from '../components/Navbar';
import Ipsum from '../components/Ipsum';

export default function MainPage() {
  return(
    <>
      <Navbar/>
      <Container>
        <Ipsum title={'Main'}/>
      </Container>
    </>
  );
}