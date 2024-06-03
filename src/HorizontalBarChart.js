import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from 'recharts'; // Import Cell from 'recharts'

const HorizontalBarChart = ({ data, onDataClick, selectedLabel }) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      layout="vertical"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      onClick={(event) => {
        if (event && event.activePayload && event.activePayload.length > 0) {
          onDataClick(event.activePayload[0].payload.name);
        }
      }}
    >
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar 
        dataKey="value" 
        fill="#82ca9d" 
        name="Falhas" 
        isAnimationActive={false} 
        onClick={(event) => {
          if (event && event.activePayload && event.activePayload.length > 0) {
            onDataClick(event.activePayload[0].payload.name);
          }
        }}
        >
        {
          data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.name === selectedLabel ? '#ff7300' : '#82ca9d'} 
            />
          ))
        }
      </Bar>
    </BarChart>
  );
};

export default HorizontalBarChart;
