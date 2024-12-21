import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Storefront from './pages/storefront';
import Hoverpage from './pages/hoverpage';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<Storefront />}></Route>
      <Route exact path='/hoverpage' element={<Hoverpage />}></Route>
    </Routes>
  );
}

export default Main;