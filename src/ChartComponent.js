import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';

const ChartComponent = ({ data }) => {
  return (
    <div>
      <ComposedChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" barSize={20} fill="#8884d8" />
        <Line type="monotone" dataKey="attrition" stroke="#82ca9d" />
        <Line type="monotone" dataKey="all_trend" stroke="#ffc658" />
        <Brush dataKey="hour" height={30} stroke="#8884d8" />
      </ComposedChart>
    </div>
  );
};

export default ChartComponent;
