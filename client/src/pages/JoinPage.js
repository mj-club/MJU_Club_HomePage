import React from 'react';
import { Container } from 'reactstrap';

import Navbar from '../components/Navbar';
import Ipsum from '../components/Ipsum';
import JoinForm from '../components/Auth/JoinForm';

export default function JoinPage() {
  return(
    <>
      <Navbar/>
      <Container>
        <Ipsum title={"Join"}></Ipsum>
        <JoinForm />
      </Container>
    </>
  );
}