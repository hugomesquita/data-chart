import React, { useState } from 'react';
import VerticalBarChart from './VerticalBarChart';
import HorizontalBarChart from './HorizontalBarChart';
import LineChartComponent from './LineChartComponent';
import ChartComponent from './ChartComponent';
import Card from './Card';
import Chart from './Chart';
import dados from './dados.json'

const App = () => {
  // const [selectedGroup, setSelectedGroup] = useState(null);

  // const handleClick = (group) => {
  //   setSelectedGroup(group);
  // };

  const [filteredData, setFilteredData] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const data = {
    'SMT A': [
      { name: 'EOI 1', value: 10, label: 'Falhas Tipo 1', date: '2024-01-01T01:00:00' },
      { name: 'EOI 2', value: 15, label: 'Falhas Tipo 2', date: '2024-01-01T02:00:00' },
      { name: 'EOI 1', value: 12, label: 'Falhas Tipo 1', date: '2024-01-01T03:00:00' },
      { name: 'EOI 2', value: 12, label: 'Falhas Tipo 2', date: '2024-01-01T04:00:00' },
      { name: 'EOI 1', value: 8, label: 'Falhas Tipo 1', date: '2024-01-01T05:00:00' },
      { name: 'EOI 2', value: 10, label: 'Falhas Tipo 2', date: '2024-01-01T06:00:00' },
      { name: 'EOI 1', value: 5, label: 'Falhas Tipo 1', date: '2024-01-01T07:00:00' },
      { name: 'EOI 2', value: 9, label: 'Falhas Tipo 2', date: '2024-01-01T08:00:00' },
      { name: 'EOI 1', value: 7, label: 'Falhas Tipo 1', date: '2024-01-01T09:00:00' },
      { name: 'EOI 2', value: 14, label: 'Falhas Tipo 2', date: '2024-01-01T10:00:00' },
      { name: 'EOI 1', value: 11, label: 'Falhas Tipo 1', date: '2024-01-01T11:00:00' },
      { name: 'EOI 2', value: 8, label: 'Falhas Tipo 2', date: '2024-01-01T12:00:00' },
      { name: 'EOI 1', value: 6, label: 'Falhas Tipo 1', date: '2024-01-01T13:00:00' },
      { name: 'EOI 2', value: 7, label: 'Falhas Tipo 2', date: '2024-01-01T14:00:00' },
      { name: 'EOI 1', value: 9, label: 'Falhas Tipo 1', date: '2024-01-01T15:00:00' },
    ],
    'SMT B': [
      { name: 'EOI 1', value: 10, label: 'Falhas Tipo 1', date: '2024-01-01T01:00:00' },
      { name: 'EOI 2', value: 15, label: 'Falhas Tipo 2', date: '2024-01-01T02:00:00' },
      { name: 'EOI 1', value: 5, label: 'Falhas Tipo 1', date: '2024-01-01T03:00:00' },
      { name: 'EOI 2', value: 20, label: 'Falhas Tipo 2', date: '2024-01-01T04:00:00' },
      { name: 'EOI 1', value: 7, label: 'Falhas Tipo 1', date: '2024-01-01T05:00:00' },
      { name: 'EOI 2', value: 18, label: 'Falhas Tipo 2', date: '2024-01-01T06:00:00' },
      { name: 'EOI 1', value: 9, label: 'Falhas Tipo 1', date: '2024-01-01T07:00:00' },
      { name: 'EOI 2', value: 17, label: 'Falhas Tipo 2', date: '2024-01-01T08:00:00' },
      { name: 'EOI 1', value: 8, label: 'Falhas Tipo 1', date: '2024-01-01T09:00:00' },
      { name: 'EOI 2', value: 16, label: 'Falhas Tipo 2', date: '2024-01-01T10:00:00' },
      { name: 'EOI 1', value: 6, label: 'Falhas Tipo 1', date: '2024-01-01T11:00:00' },
      { name: 'EOI 2', value: 15, label: 'Falhas Tipo 2', date: '2024-01-01T12:00:00' },
      { name: 'EOI 1', value: 5, label: 'Falhas Tipo 1', date: '2024-01-01T13:00:00' },
      { name: 'EOI 2', value: 7, label: 'Falhas Tipo 2', date: '2024-01-01T14:00:00' },
      { name: 'EOI 1', value: 9, label: 'Falhas Tipo 1', date: '2024-01-01T15:00:00' },
    ],
    'SMT C': [
      { name: 'EOI 1', value: 10, label: 'Falhas Tipo 1', date: '2024-01-01T01:00:00' },
      { name: 'EOI 2', value: 15, label: 'Falhas Tipo 2', date: '2024-01-01T02:00:00' },
      { name: 'EOI 1', value: 5, label: 'Falhas Tipo 1', date: '2024-01-01T03:00:00' },
      { name: 'EOI 2', value: 20, label: 'Falhas Tipo 2', date: '2024-01-01T04:00:00' },
      { name: 'EOI 1', value: 7, label: 'Falhas Tipo 1', date: '2024-01-01T05:00:00' },
      { name: 'EOI 2', value: 18, label: 'Falhas Tipo 2', date: '2024-01-01T06:00:00' },
      { name: 'EOI 1', value: 9, label: 'Falhas Tipo 1', date: '2024-01-01T07:00:00' },
      { name: 'EOI 2', value: 17, label: 'Falhas Tipo 2', date: '2024-01-01T08:00:00' },
      { name: 'EOI 1', value: 8, label: 'Falhas Tipo 1', date: '2024-01-01T09:00:00' },
      { name: 'EOI 2', value: 16, label: 'Falhas Tipo 2', date: '2024-01-01T10:00:00' },
      { name: 'EOI 1', value: 6, label: 'Falhas Tipo 1', date: '2024-01-01T11:00:00' },
    ],
  };


  const handleDataClick = (name) => {
    if (name === 'Total Geral') {
      const totalData = Object.values(data).flat();
      setFilteredData(totalData);
    } else {
      const selectedData = data[name];
      if (selectedData) {
        setFilteredData(selectedData);
      } else {
        const selectedTypeData = Object.values(data).flat().filter(item => item.name === name);
        setFilteredData(selectedTypeData);
      }
    }
    setSelectedLabel(name);
  };

  const combinedFailureData = Object.values(data).flat();
  const newData = Object.keys(data).map((key) => ({
    name: key,
    quantity: data[key].reduce((acc, cur) => acc + cur.value, 0),
  }));

  const totalGeral = newData.reduce((acc, cur) => acc + cur.quantity, 0);
  const quantidadeSMTA = newData.find(item => item.name === 'SMT A').quantity;
  const quantidadeSMTB = newData.find(item => item.name === 'SMT B').quantity;
  const quantidadeSMTC = newData.find(item => item.name === 'SMT C').quantity;

  console.log(newData)
  return (
    <div>
      <h1>SMT Data Visualization</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleDataClick('Total Geral')}>
          <h3>Total Geral</h3>
          <p>{totalGeral}</p>
        </div>
        <div style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleDataClick('SMT A')}>
          <h3>Quantidade SMT A</h3>
          <p>{quantidadeSMTA}</p>
        </div>
        <div style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleDataClick('SMT B')}>
          <h3>Quantidade SMT B</h3>
          <p>{quantidadeSMTB}</p>
        </div>
        <div style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => handleDataClick('SMT C')}>
          <h3>Quantidade SMT C</h3>
          <p>{quantidadeSMTC}</p>
        </div>
      </div>
      {selectedLabel && <h2>Selected: {selectedLabel}</h2>}
      <VerticalBarChart data={newData} onDataClick={handleDataClick} selectedLabel={selectedLabel} />
      <HorizontalBarChart data={filteredData || combinedFailureData} onDataClick={handleDataClick} selectedLabel={selectedLabel} />
      <LineChartComponent data={filteredData || combinedFailureData} />

      

      {/* <ChartComponent data={dados.failures_over_time} /> */}

    </div>
  );
};

export default App;
