import React, { useState } from 'react';
import VerticalBarChart from './VerticalBarChart';
import HorizontalBarChart from './HorizontalBarChart';
import LineChartComponent from './LineChartComponent';

const App = () => {
  const [selectedSMT, setSelectedSMT] = useState(null);

  const handleBarClick = (smt) => {
    setSelectedSMT(smt);
  };

  const failureData = {
    'SMT A': [
      { name: 'EOI 1', value: 10, label: 'Falhas Tipo 1' },
      { name: 'EOI 2', value: 15, label: 'Falhas Tipo 2' },
    ],
    'SMT B': [
      { name: 'EOI 1', value: 5, label: 'Falhas Tipo 1' },
      { name: 'EOI 2', value: 20, label: 'Falhas Tipo 2' },
    ],
    'SMT C': [
      { name: 'EOI 1', value: 8, label: 'Falhas Tipo 1' },
      { name: 'EOI 2', value: 12, label: 'Falhas Tipo 2' },
    ],
  };

  const combinedFailureData = Object.values(failureData).flat();
  const lineChartData = [
    { date: '2023-01-01', SMT_A: 30, SMT_B: 20, SMT_C: 10 },
    { date: '2023-02-01', SMT_A: 20, SMT_B: 25, SMT_C: 15 },
    { date: '2023-03-01', SMT_A: 27, SMT_B: 15, SMT_C: 20 },
    { date: '2023-04-01', SMT_A: 25, SMT_B: 30, SMT_C: 18 },
    { date: '2023-05-01', SMT_A: 30, SMT_B: 20, SMT_C: 25 },
  ];

  // const lineChartData = {
  //   'SMT A': [
  //     { date: '2023-01-01', value: 30 },
  //     { date: '2023-02-01', value: 20 },
  //     { date: '2023-03-01', value: 27 },
  //     { date: '2023-04-01', value: 25 },
  //     { date: '2023-05-01', value: 30 },
  //   ],
  //   'SMT B': [
  //     { date: '2023-01-01', value: 20 },
  //     { date: '2023-02-01', value: 25 },
  //     { date: '2023-03-01', value: 15 },
  //     { date: '2023-04-01', value: 30 },
  //     { date: '2023-05-01', value: 20 },
  //   ],
  //   'SMT C': [
  //     { date: '2023-01-01', value: 10 },
  //     { date: '2023-02-01', value: 15 },
  //     { date: '2023-03-01', value: 20 },
  //     { date: '2023-04-01', value: 18 },
  //     { date: '2023-05-01', value: 25 },
  //   ],
  // };

  // const combinedLineChartData = [
  //   { date: '2023-01-01', SMT_A: 30, SMT_B: 20, SMT_C: 10 },
  //   { date: '2023-02-01', SMT_A: 20, SMT_B: 25, SMT_C: 15 },
  //   { date: '2023-03-01', SMT_A: 27, SMT_B: 15, SMT_C: 20 },
  //   { date: '2023-04-01', SMT_A: 25, SMT_B: 30, SMT_C: 18 },
  //   { date: '2023-05-01', SMT_A: 30, SMT_B: 20, SMT_C: 25 },
  // ];

  return (
    <div>
      <h1>SMT Data Visualization</h1>
      <VerticalBarChart onBarClick={handleBarClick} />
      <HorizontalBarChart data={selectedSMT ? failureData[selectedSMT] : combinedFailureData} />
      <LineChartComponent data={lineChartData} />
    </div>
  );
};

export default App;
