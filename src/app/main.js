import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Mainpage from './pages/mainpage';
import Hoverpage from './pages/hoverpage';

const Main = () => {
  return (
    <Routes> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' element={<Mainpage />}></Route>
      <Route exact path='/hoverpage' element={<Hoverpage />}></Route>
    </Routes>
  );
}

export default Main;