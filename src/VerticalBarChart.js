import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'SMT A', quantity: 30 },
  { name: 'SMT B', quantity: 45 },
  { name: 'SMT C', quantity: 20 },
];

const VerticalBarChart = ({ onDataClick }) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      onClick={(event) => {
        if (event && event.activeLabel) {
          onDataClick(event.activeLabel);
        }
      }}
    >
      <XAxis dataKey="name" />
      <YAxis type="number" domain={[0, 60]} />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantity" fill="#8884d8" />
    </BarChart>
  );
};

export default VerticalBarChart;
