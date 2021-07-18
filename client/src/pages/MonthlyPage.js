import React from 'react';
import { Container } from 'reactstrap';

import Navbar from '../components/Navbar';
import Ipsum from '../components/Ipsum';

export default function MonthlyPage() {
  return(
    <>
      <Navbar/>
      <Container>
        <Ipsum title={"Monthly Key:um"}></Ipsum>
      </Container>
    </>
  );
}