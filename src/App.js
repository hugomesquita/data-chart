import React, { useState } from 'react';
import VerticalBarChart from './VerticalBarChart';
import HorizontalBarChart from './HorizontalBarChart';
import LineChartComponent from './LineChartComponent';

const App = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const data = {
    'SMT A': [
      { name: 'EOI 1', value: 10, label: 'Falhas Tipo 1', date: '2024-01-01' },
      { name: 'EOI 2', value: 15, label: 'Falhas Tipo 2', date: '2024-01-02' },
      { name: 'EOI 1', value: 12, label: 'Falhas Tipo 1', date: '2024-01-03' },
      { name: 'EOI 2', value: 12, label: 'Falhas Tipo 2', date: '2024-01-04' },
      { name: 'EOI 1', value: 8, label: 'Falhas Tipo 1', date: '2024-01-05' },
      { name: 'EOI 2', value: 10, label: 'Falhas Tipo 2', date: '2024-01-06' },
      { name: 'EOI 1', value: 5, label: 'Falhas Tipo 1', date: '2024-01-07' },
      { name: 'EOI 2', value: 9, label: 'Falhas Tipo 2', date: '2024-01-08' },
      { name: 'EOI 1', value: 7, label: 'Falhas Tipo 1', date: '2024-01-09' },
      { name: 'EOI 2', value: 14, label: 'Falhas Tipo 2', date: '2024-01-10' },
      { name: 'EOI 1', value: 11, label: 'Falhas Tipo 1', date: '2024-01-11' },
      { name: 'EOI 2', value: 8, label: 'Falhas Tipo 2', date: '2024-01-12' },
      { name: 'EOI 1', value: 6, label: 'Falhas Tipo 1', date: '2024-01-13' },
      { name: 'EOI 2', value: 7, label: 'Falhas Tipo 2', date: '2024-01-14' },
      { name: 'EOI 1', value: 9, label: 'Falhas Tipo 1', date: '2024-01-15' },
    ],
    'SMT B': [
      { name: 'EOI 1', value: 10, label: 'Falhas Tipo 1', date: '2024-01-01' },
      { name: 'EOI 2', value: 15, label: 'Falhas Tipo 2', date: '2024-01-02' },
      { name: 'EOI 1', value: 5, label: 'Falhas Tipo 1', date: '2024-01-03' },
      { name: 'EOI 2', value: 20, label: 'Falhas Tipo 2', date: '2024-01-04' },
      { name: 'EOI 1', value: 7, label: 'Falhas Tipo 1', date: '2024-01-05' },
      { name: 'EOI 2', value: 18, label: 'Falhas Tipo 2', date: '2024-01-06' },
      { name: 'EOI 1', value: 9, label: 'Falhas Tipo 1', date: '2024-01-07' },
      { name: 'EOI 2', value: 17, label: 'Falhas Tipo 2', date: '2024-01-08' },
      { name: 'EOI 1', value: 8, label: 'Falhas Tipo 1', date: '2024-01-09' },
      { name: 'EOI 2', value: 16, label: 'Falhas Tipo 2', date: '2024-01-10' },
      { name: 'EOI 1', value: 6, label: 'Falhas Tipo 1', date: '2024-01-11' },
      { name: 'EOI 2', value: 15, label: 'Falhas Tipo 2', date: '2024-01-12' },
      { name: 'EOI 1', value: 5, label: 'Falhas Tipo 1', date: '2024-01-13' },
      { name: 'EOI 2', value: 7, label: 'Falhas Tipo 2', date: '2024-01-14' },
      { name: 'EOI 1', value: 9, label: 'Falhas Tipo 1', date: '2024-01-15' },
    ],
    'SMT C': [
      { name: 'EOI 1', value: 10, label: 'Falhas Tipo 1', date: '2024-01-01' },
      { name: 'EOI 2', value: 15, label: 'Falhas Tipo 2', date: '2024-01-02' },
      { name: 'EOI 1', value: 5, label: 'Falhas Tipo 1', date: '2024-01-03' },
      { name: 'EOI 2', value: 20, label: 'Falhas Tipo 2', date: '2024-01-04' },
      { name: 'EOI 1', value: 7, label: 'Falhas Tipo 1', date: '2024-01-05' },
      { name: 'EOI 2', value: 18, label: 'Falhas Tipo 2', date: '2024-01-06' },
      { name: 'EOI 1', value: 9, label: 'Falhas Tipo 1', date: '2024-01-07' },
      { name: 'EOI 2', value: 17, label: 'Falhas Tipo 2', date: '2024-01-08' },
      { name: 'EOI 1', value: 8, label: 'Falhas Tipo 1', date: '2024-01-09' },
      { name: 'EOI 2', value: 16, label: 'Falhas Tipo 2', date: '2024-01-10' },
      { name: 'EOI 1', value: 6, label: 'Falhas Tipo 1', date: '2024-01-11' },
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
  const newData = Object.keys(data).map((key) => ({
    name: key,
    quantity: data[key].reduce((acc, cur) => acc + cur.value, 0),
  }));

  console.log(newData)
  return (
    <div>
      <h1>SMT Data Visualization</h1>
      {selectedLabel && <h2>Selected: {selectedLabel}</h2>}
      <VerticalBarChart data={newData} onDataClick={handleDataClick} selectedLabel={selectedLabel} />
      <HorizontalBarChart data={filteredData || combinedFailureData} onDataClick={handleDataClick} selectedLabel={selectedLabel} />
      <LineChartComponent data={filteredData || combinedFailureData} />
    </div>
  );
};

export default App;
