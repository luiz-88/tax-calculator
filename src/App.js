// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Calculation from './views/Calculation';
import { PayslipProvider } from './context/PayslipContext';

const App = () => {
  return (
    <PayslipProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculation" element={<Calculation />} />
        </Routes>
      </Router>
    </PayslipProvider>
  );
};

export default App;
