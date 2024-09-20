// views/Home.js

import React from 'react';
import { usePayslipContext } from '../context/PayslipContext';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Home = () => {
  const { getLastPayslip } = usePayslipContext();
  const lastPayslip = getLastPayslip();

  return (
    <div>
      <h1>Tax Calculator App</h1>
      {lastPayslip ? (
        <div>
          <h2>Last Payslip:</h2>
          <p>Name: {lastPayslip.name}</p>
          <p>Pay Period: {lastPayslip.payPeriod}</p>
          <p>Gross Income: {lastPayslip.grossIncome}</p>
          <p>Income Tax: {lastPayslip.incomeTax}</p>
          <p>Net Income: {lastPayslip.netIncome}</p>
          <p>Super: {lastPayslip.super}</p>
        </div>
      ) : (
        <p>No payslip found.</p>
      )}
      
      {/* Button to navigate to Calculation page */}
      <Link to="/calculation">
        <button>Go to Payslip Calculation</button>
      </Link>
    </div>
  );
};

export default Home;
