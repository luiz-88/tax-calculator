
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Header from './Header';

const Home = () => {
  return (
    <div>
      <h1>Tax Calculator App</h1>
      <Header />
      <Link to="/calculation">
        <button>Go to Payslip Calculation</button>
      </Link>
    </div>
  );
};

export default Home;
