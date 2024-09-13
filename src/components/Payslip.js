import React from 'react';

const Payslip = ({ employeeData }) => {
  //Destructuring the props
  const { firstName, lastName, annualSalary, superRate, paymentMonth } = employeeData;

  // Calculate the gross income, income tax, net income, and superannuation
  const grossIncome = Math.floor(annualSalary / 12);
  const incomeTax = calculateIncomeTax(annualSalary);
  const netIncome = grossIncome - incomeTax;
  const superAmount = Math.floor(grossIncome * superRate);

  // Generate the pay period (fromDate and toDate)
  const fromDate = `01 ${getMonthName(paymentMonth)}`;
  const toDate = `${new Date(2024, paymentMonth, 0).getDate()} ${getMonthName(paymentMonth)}`;

  // Function to calculate income tax
  function calculateIncomeTax(salary) {
    let tax = 0;
    if (salary <= 18200) return 0;
    else if (salary <= 37000) tax = (salary - 18200) * 0.19;
    else if (salary <= 87000) tax = 3572 + (salary - 37000) * 0.325;
    else if (salary <= 180000) tax = 19822 + (salary - 87000) * 0.37;
    else tax = 54232 + (salary - 180000) * 0.45;
    return Math.round(tax / 12); // Return monthly tax
  }

  // Function to get the name of the month
  function getMonthName(month) {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  }

  return (
    <div className="payslip">
      {/* Render the employee's payslip in the correct format */}
      <h2>{`Staff Name: ${firstName} ${lastName}`}</h2>
      <p>{`Pay Period: ${fromDate} – ${toDate}`}</p>
      <p>{`Gross Income: ${grossIncome}`}</p>
      <p>{`Income Tax: ${incomeTax}`}</p>
      <p>{`Net Income: ${netIncome}`}</p>
      <p>{`Super: ${superAmount}`}</p>
    </div>
  );
};

export default Payslip;
