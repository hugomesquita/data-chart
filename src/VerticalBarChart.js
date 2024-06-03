import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'SMT A', quantity: 30 },
  { name: 'SMT B', quantity: 45 },
  { name: 'SMT C', quantity: 20 },
];

const VerticalBarChart = ({ onBarClick }) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
      onClick={(data) => {
        if (data && data.activeLabel) {
          onBarClick(data.activeLabel);
        }
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <CartesianGrid stroke="none" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantity" fill="#8884d8" />
    </BarChart>
  );
};

export default VerticalBarChart;
