import React from 'react';
import { Container } from 'reactstrap';

import LoginForm from '../components/Auth/LoginForm';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  return(
    <>
      <Navbar/>
      <Container>
        <LoginForm/>
      </Container>
    </>
  );
}