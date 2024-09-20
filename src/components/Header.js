// components/Header.js

import React from 'react';

const Header = ({ lastPayslip }) => {
  return (
    <header>
      <h1>Employee Payslip</h1>
      {lastPayslip ? (
        <p>
          Last payslip: {lastPayslip.name}, {lastPayslip.payPeriod}, 
          Gross Income: ${lastPayslip.grossIncome}, 
          Income Tax: ${lastPayslip.incomeTax}, 
          Net Income: ${lastPayslip.netIncome}, 
          Super: ${lastPayslip.super}
        </p>
      ) : (
        <p>No payslip found.</p>
      )}
    </header>
  );
};

export default Header;
