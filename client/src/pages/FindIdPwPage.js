import React from 'react';
import { Container } from 'reactstrap';

import Navbar from '../components/Navbar';
import Ipsum from '../components/Ipsum';

export default function FindIdPwPage() {
  return(
    <>
      <Navbar/>
      <Container>
        <Ipsum title={"Find ID & PWD"}></Ipsum>
      </Container>
    </>
  );
}