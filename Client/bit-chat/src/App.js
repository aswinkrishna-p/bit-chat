import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Pages/Register';

function App(props) {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/register' element = {<Register/>} />
        </Routes>
      
      </BrowserRouter>
  );
}

export default App;