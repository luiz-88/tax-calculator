// models/payslipModel.js

// Define the tax rates as an array of objects, similar to your TaxRateEntity in Java
const taxRates = [
  { startFrom: 180001, baseTaxAmount: 54232, taxPerDollar: 0.45 },
  { startFrom: 87001, baseTaxAmount: 19822, taxPerDollar: 0.37 },
  { startFrom: 37001, baseTaxAmount: 3572, taxPerDollar: 0.325 },
  { startFrom: 18201, baseTaxAmount: 0, taxPerDollar: 0.19 },
  { startFrom: 0, baseTaxAmount: 0, taxPerDollar: 0 }
];

// Utility function to round values according to the specified rules
const round = (value) => {
  return Math.round(value);
};

// Function to get sorted tax rates, like `getSortedTaxRate().stream()` in Java
const getSortedTaxRates = () => {
  return taxRates.sort((a, b) => b.startFrom - a.startFrom);
};

export const calculatePayslip = (employee) => {
  // Find the applied tax rate using `find()` after filtering the sorted tax rates
  const appliedTaxRate = getSortedTaxRates().find(taxRate => employee.annualSalary >= taxRate.startFrom);

  // Base tax and per dollar rate from the matched tax rate
  const baseTaxAmount = appliedTaxRate.baseTaxAmount;
  const taxPerDollar = appliedTaxRate.taxPerDollar;

  // Calculate gross income
  const grossIncome = round(employee.annualSalary / 12);

  // Calculate income tax
  const incomeTax = round(
    (baseTaxAmount + taxPerDollar * (employee.annualSalary - appliedTaxRate.startFrom + 1)) / 12
  );

  // Calculate net income
  const netIncome = grossIncome - incomeTax;

  // Calculate superannuation
  const superAnnuation = round(grossIncome * (employee.superRate / 100));

  // For simplicity, assuming the payment start date is provided in the format "01 March – 31 March"
  const payPeriod = employee.paymentStartDate;

  // Return the payslip object
  return {
    name: `${employee.firstName} ${employee.lastName}`,
    payPeriod,
    grossIncome,
    incomeTax,
    netIncome,
    super: superAnnuation
  };
};
