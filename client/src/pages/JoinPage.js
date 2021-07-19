import React from 'react';
import { Container } from 'reactstrap';

import Navbar from '../components/Navbar';
import JoinForm from '../components/Auth/JoinForm';

export default function JoinPage() {
  return(
    <>
      <Navbar/>
      <Container>
        <JoinForm />
      </Container>
    </>
  );
}