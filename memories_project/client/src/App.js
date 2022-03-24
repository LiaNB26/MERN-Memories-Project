import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Auth from './components/Auth/Auth.js';

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth='lg'>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/auth' exact element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;

{
  /* <div>
        Photo by{' '}
        <a href='https://unsplash.com/@timothyeberly?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
          Timothy Eberly
        </a>{' '}
        on{' '}
        <a href='https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
          Unsplash
        </a>
      </div> */
}
