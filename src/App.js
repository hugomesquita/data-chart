import React, { useState } from 'react';
import VerticalBarChart from './VerticalBarChart';
import HorizontalBarChart from './HorizontalBarChart';
import LineChartComponent from './LineChartComponent';

const App = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const data = {
    'SMT A': [
      { name: 'Type 1', value: 10, label: 'Falhas Tipo 1', date: '2024-01-01' },
      { name: 'Type 2', value: 15, label: 'Falhas Tipo 2', date: '2024-01-02' },
    ],
    'SMT B': [
      { name: 'Type 1', value: 5, label: 'Falhas Tipo 1', date: '2024-01-03' },
      { name: 'Type 2', value: 20, label: 'Falhas Tipo 2', date: '2024-01-04' },
    ],
    'SMT C': [
      { name: 'Type 1', value: 8, label: 'Falhas Tipo 1', date: '2024-01-05' },
      { name: 'Type 2', value: 12, label: 'Falhas Tipo 2', date: '2024-01-06' },
    ],
  };

  const handleDataClick = (name) => {
    const selectedData = data[name];
    if (selectedData) {
      setFilteredData(selectedData);
      setSelectedLabel(name);
    } else {
      const selectedTypeData = Object.values(data).flat().filter(item => item.name === name);
      setFilteredData(selectedTypeData);
      setSelectedLabel(name);
    }
  };

  const combinedFailureData = Object.values(data).flat();

  return (
    <div>
      <h1>SMT Data Visualization</h1>
      {selectedLabel && <h2>Selected: {selectedLabel}</h2>}
      <VerticalBarChart onDataClick={handleDataClick} selectedLabel={selectedLabel} />
      <HorizontalBarChart data={filteredData || combinedFailureData} onDataClick={handleDataClick} selectedLabel={selectedLabel} />
      <LineChartComponent data={filteredData || combinedFailureData} />
    </div>
  );
};

export default App;
