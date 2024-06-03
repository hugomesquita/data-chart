import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const HorizontalBarChart = ({ data }) => {
  return (
    <BarChart
      width={800}
      height={400}
      data={data}
      layout="vertical"
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <CartesianGrid stroke="none" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#82ca9d" name="Falhas" />
    </BarChart>
  );
};

export default HorizontalBarChart;
