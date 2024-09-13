import React, { useState } from 'react';

const EmployeeForm = ({ onCalculatePayslip }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [annualSalary, setAnnualSalary] = useState('');
  const [superRate, setSuperRate] = useState('');
  const [paymentMonth, setPaymentMonth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');  // Add this line to check if form submission happens
    // debugger;  
    const employee = {
      firstName,
      lastName,
      annualSalary: parseInt(annualSalary),
      superRate: parseFloat(superRate),
      paymentMonth: parseInt(paymentMonth)
    };

    onCalculatePayslip(employee);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Annual Salary</label>
        <input
          type="number"
          value={annualSalary}
          onChange={(e) => setAnnualSalary(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Super Rate (%)</label>
        <input
          type="number"
          step="0.01"
          value={superRate}
          onChange={(e) => setSuperRate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Payment Month (1-12)</label>
        <input
          type="number"
          value={paymentMonth}
          onChange={(e) => setPaymentMonth(e.target.value)}
          required
        />
      </div>
      <button type="submit">Calculate Payslip</button>
    </form>
  );
};

export default EmployeeForm;
