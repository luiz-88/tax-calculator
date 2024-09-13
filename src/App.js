import React, { useState } from 'react';
import EmployeeForm from './components/EmployeeForm';
import Payslip from './components/Payslip';
import './App.css';

const App = () => {
  const [employeeData, setEmployeeData] = useState(null);

  const handleCalculatePayslip = (data) => {
    console.log('Employee data passed to App:', data); // Log the data received from EmployeeForm
    setEmployeeData(data);
  };

  return (
    <div className="App">
      <h1 className ="heading">Employee Monthly Payslip Generator</h1>
      <EmployeeForm onCalculatePayslip={handleCalculatePayslip} />
      {employeeData && <Payslip employeeData={employeeData} />}
    </div>
  );
};

export default App;
