import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import { format } from 'date-fns';

const LineChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            tickFormatter={(date) => format(new Date(date), 'HH:mm')}
        />
        <YAxis domain={[0, 40]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          name="Falhas ao longo do tempo"
        />
        <Brush 
            dataKey="date" 
            height={30} 
            stroke="#8884d8"
            // startIndex={1}
            tickFormatter={(date) => format(new Date(date), 'HH:mm')}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
