// views/Calculation.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { calculatePayslip } from '../models/payslipModel';
import Header from '../views/Header'; // Import the Header component

const Calculation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    annualSalary: '',
    superRate: '',
    paymentStartDate: '',
  });

  const [payslip, setPayslip] = useState(null);
  const [error, setError] = useState('');
  
  // New state to track when a new payslip is saved
  const [payslipSaved, setPayslipSaved] = useState(false);

  const handleInputChange = (e) => {
    debugger;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;

    const { firstName, lastName, annualSalary, superRate, paymentStartDate } = formData;

    // Validate the input
    if (!firstName || !lastName || !annualSalary || !superRate || !paymentStartDate) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(annualSalary) || annualSalary <= 0) {
      setError('Annual salary must be a positive number.');
      return;
    }

    if (isNaN(superRate) || superRate < 0 || superRate > 50) {
      setError('Super rate must be a number between 0 and 50.');
      return;
    }

    try {
      // Clear any previous errors
      setError('');

      // Calculate payslip
      const calculatedPayslip = calculatePayslip({
        firstName,
        lastName,
        annualSalary: parseFloat(annualSalary),
        superRate: parseFloat(superRate) / 100,
        paymentStartDate,
      });

      // Retrieve existing payslips from local storage or initialize an empty array if none exist
      const storedPayslips = JSON.parse(localStorage.getItem('payslips')) || [];

      // Append the new payslip to the array
      storedPayslips.push(calculatedPayslip);

      // Store the updated array in local storage
      localStorage.setItem('payslips', JSON.stringify(storedPayslips));

      // Show the result
      setPayslip(calculatedPayslip);
      
      // Trigger the Header to reload the last payslip
      setPayslipSaved(true);  // Update trigger to notify Header

    } catch (err) {
      setError('There was an error generating the payslip.');
    }
  };

  return (
    <div>
      {/* Pass the trigger (payslipSaved) to the Header */}
      <Header payslipSaved={payslipSaved} />  

      <h1>Calculate Payslip</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Annual Salary:</label>
          <input
            type="number"
            name="annualSalary"
            value={formData.annualSalary}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Super Rate (%):</label>
          <input
            type="number"
            name="superRate"
            value={formData.superRate}
            onChange={handleInputChange}
            step="0.01"
          />
        </div>
        <div>
          <label>Payment Start Date:</label>
          <input
            type="text"
            name="paymentStartDate"
            value={formData.paymentStartDate}
            onChange={handleInputChange}
            placeholder="e.g. 01 March – 31 March"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default Calculation;
