// views/Calculation.js

import React, { useState } from 'react';
import { usePayslipContext } from '../context/PayslipContext';
import { calculatePaySlip } from '../models/payslipModel';

const Calculation = () => {
  const { addPayslip } = usePayslipContext();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    annualSalary: '',
    superRate: '',
    paymentStartDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Transform the form data into a payslip
    const payslip = calculatePaySlip({
      firstName: formData.firstName,
      lastName: formData.lastName,
      annualSalary: parseInt(formData.annualSalary, 10),
      superRate: parseFloat(formData.superRate),
      paymentStartDate: formData.paymentStartDate
    });

    // Add the payslip to context and local storage
    addPayslip(payslip);
  };

  return (
    <div>
      <h1>Calculation</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="annualSalary"
          placeholder="Annual Salary"
          value={formData.annualSalary}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="superRate"
          placeholder="Super Rate (%)"
          step="0.01"
          value={formData.superRate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="paymentStartDate"
          placeholder="Payment Start Date"
          value={formData.paymentStartDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Generate Payslip</button>
      </form>
    </div>
  );
};

export default Calculation;
