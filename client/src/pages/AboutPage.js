import React from 'react';
import { Container } from 'reactstrap';

import Navbar from '../components/Navbar';
import Ipsum from '../components/Ipsum';

export default function AboutPage() {
  return(
    <>
      <Navbar/>
      <Container>
        <Ipsum title={"About"}></Ipsum>
      </Container>
    </>
  );
}