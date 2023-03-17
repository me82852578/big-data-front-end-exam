import React from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import MainLayout from './layouts';
import Home from './pages/home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />}>
            <Route path=":cName/:dName" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
