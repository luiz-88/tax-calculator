// context/PayslipContext.js

import React, { createContext, useContext, useState } from 'react';

const PayslipContext = createContext(undefined);

export const PayslipProvider = ({ children }) => {
  const [payslips, setPayslips] = useState(() => JSON.parse(localStorage.getItem('payslips')) || []);

  const addPayslip = (payslip) => {
    const newPayslips = [...payslips, payslip];
    setPayslips(newPayslips);
    localStorage.setItem('payslips', JSON.stringify(newPayslips));
  };

  const getLastPayslip = () => {
    return payslips.length > 0 ? payslips[payslips.length - 1] : null;
  };

  return (
    <PayslipContext.Provider value={{ payslips, addPayslip, getLastPayslip }}>
      {children}
    </PayslipContext.Provider>
  );
};

export const usePayslipContext = () => {
  const context = useContext(PayslipContext);
  if (context === undefined) {
    throw new Error('usePayslipContext must be used within a PayslipProvider');
  }
  return context;
};
