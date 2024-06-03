import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LineChartComponent = ({ data }) => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="SMT_A" stroke="#8884d8" name="SMT A" />
      <Line type="monotone" dataKey="SMT_B" stroke="#82ca9d" name="SMT B" />
      <Line type="monotone" dataKey="SMT_C" stroke="#ffc658" name="SMT C" />
    </LineChart>
  );
};

export default LineChartComponent;
