import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts'; // Import Cell from 'recharts'

const HorizontalBarChart = ({ data, onDataClick, selectedLabel }) => {
  // Grouping data by 'name' field
  const groupedData = data.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = { name: curr.name, value: 0, label: curr.label };
    }
    acc[curr.name].value += curr.value;
    return acc;
  }, {});

  const groupedChartData = Object.values(groupedData);


  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={600}
        height={300}
        data={groupedChartData}
        layout="vertical"
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
        onClick={(event) => {
          if (event && event.activePayload && event.activePayload.length > 0) {
            onDataClick(event.activePayload[0].payload.name);
          }
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 400]} />
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
                fill={entry.name === selectedLabel ? '#287f4a' : '#82ca9d'} 
              />
            ))
          }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
