// components/Header.js
import React, { useState, useEffect } from 'react';

const Header = ({ payslipSaved }) => {
  const [lastPayslip, setLastPayslip] = useState(null);

  // Load the last payslip from Local Storage if available
  useEffect(() => {
    const loadLastPayslip = () => {
      const storedPayslips = JSON.parse(localStorage.getItem('payslips'));
      if (storedPayslips && storedPayslips.length > 0) {
        const lastPayslip = storedPayslips[storedPayslips.length - 1];
        setLastPayslip(lastPayslip);
      }
    };

    loadLastPayslip();  // Load initially when the component mounts
    
    // Reload the payslip whenever the payslipSaved flag changes
    if (payslipSaved) {
      loadLastPayslip();  // Re-load last payslip after form submission
    }
  }, [payslipSaved]);  // Depend on payslipSaved to re-load when it changes

  return (
    <header>
      {lastPayslip ? (
        <div>
          <h2>Last Payslip</h2>
          <p>Name: {lastPayslip.name}</p>
          <p>Gross Income: {lastPayslip.grossIncome}</p>
          <p>Net Income: {lastPayslip.netIncome}</p>
        </div>
      ) : (
        <p>No payslip available.</p>
      )}
    </header>
  );
};

export default Header;
