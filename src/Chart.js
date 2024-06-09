import React from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({ data, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" barSize={20} fill="#8884d8" />
          <Line type="monotone" dataKey="attrition" stroke="#82ca9d" />
          <Line type="monotone" dataKey="all_trend" stroke="#ffc658" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
