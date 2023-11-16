import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import List from './components/List';
import Myinfo from './components/Myinfo';
import Findpw from './components/Findpw';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/list" element={<List/>} />
          <Route path="/myinfo" element={<Myinfo/>} />
          <Route path="/findpw" element={<Findpw/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
