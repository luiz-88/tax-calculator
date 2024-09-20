const calculateIncomeTax = (annualSalary) => {
    const taxBrackets = [
      { threshold: 18200, rate: 0, base: 0 },
      { threshold: 37000, rate: 0.19, base: 0 },
      { threshold: 87000, rate: 0.325, base: 3572 },
      { threshold: 180000, rate: 0.37, base: 19822 },
      { threshold: Infinity, rate: 0.45, base: 54232 }
    ];
  
    const bracket = taxBrackets.find(b => annualSalary <= b.threshold);
    const taxableIncome = annualSalary - (bracket.threshold - 1);
    const tax = (bracket.base + taxableIncome * bracket.rate) / 12;
  
    return Math.round(tax);
  };

  const getPayPeriod = (startMonth) => {
    const date = new Date(startMonth);
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return `${date.toLocaleDateString("en-US", { month: "long", year: "numeric" })} - ${endDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;
  };
  
  const calculatePaySlip = (employee) => {
    const grossIncome = Math.round(employee.annualSalary / 12);
    const incomeTax = calculateIncomeTax(employee.annualSalary);
    const netIncome = grossIncome - incomeTax;
    const superAmount = Math.round(grossIncome * (employee.superRate / 100));
  
    return {
      name: `${employee.firstName} ${employee.lastName}`,
      payPeriod: getPayPeriod(employee.paymentStartMonth),
      grossIncome,
      incomeTax,
      netIncome,
      super: superAmount,
    };
  };