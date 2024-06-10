import React, { useState, useEffect } from 'react';
import { ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import data from './data.json';

const App = () => {
  const [chartData, setChartData] = useState([]);
  const [reasonData, setReasonData] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [filters, setFilters] = useState({ reason: null, station: null, hour: null });

  useEffect(() => {
    // Processamento dos dados de 'repair' e 'attrition' por hora
    const processedData = Object.keys(data).reduce((acc, smt) => {
      Object.keys(data[smt]).forEach((time) => {
        const hour = time.slice(11, 16); // Extraindo hora do timestamp
        const repair = data[smt][time].repair;
        const attrition = data[smt][time].attrition;
        const reasons = data[smt][time].reason;
        const stations = data[smt][time].station;

        const matchesFilter = (filters.reason === null || reasons.some(r => r.label === filters.reason)) &&
                              (filters.station === null || stations.some(s => s.label === filters.station)) &&
                              (filters.hour === null || filters.hour === hour);

        if (matchesFilter) {
          if (!acc[hour]) {
            acc[hour] = { hour, repair: 0, attrition: 0 };
          }

          acc[hour].repair += repair;
          acc[hour].attrition += attrition;
        }
      });

      return acc;
    }, {});

    setChartData(Object.values(processedData));

    // Processamento dos dados de 'reason' para o gráfico horizontal
    const reasonCounts = Object.keys(data).reduce((acc, smt) => {
      Object.keys(data[smt]).forEach((time) => {
        const hour = time.slice(11, 16); // Extraindo hora do timestamp
        const reasons = data[smt][time].reason;

        const matchesFilter = (filters.hour === null || filters.hour === hour) &&
                              (filters.station === null || data[smt][time].station.some(s => s.label === filters.station));

        if (matchesFilter) {
          reasons.forEach((reason) => {
            if (reason.label) {
              if (!acc[reason.label]) {
                acc[reason.label] = 0;
              }
              acc[reason.label] += reason.quantity;
            }
          });
        }
      });

      return acc;
    }, {});

    const reasonArray = Object.keys(reasonCounts).map((label) => ({
      label,
      quantity: reasonCounts[label],
    }));

    setReasonData(reasonArray);

    // Processamento dos dados de 'station' para o gráfico vertical
    const stationCounts = Object.keys(data).reduce((acc, smt) => {
      Object.keys(data[smt]).forEach((time) => {
        const hour = time.slice(11, 16); // Extraindo hora do timestamp
        const stations = data[smt][time].station;

        const matchesFilter = (filters.hour === null || filters.hour === hour) &&
                              (filters.reason === null || data[smt][time].reason.some(r => r.label === filters.reason));

        if (matchesFilter) {
          stations.forEach((station) => {
            if (station.label) {
              if (!acc[station.label]) {
                acc[station.label] = 0;
              }
              acc[station.label] += station.quantity;
            }
          });
        }
      });

      return acc;
    }, {});

    const stationArray = Object.keys(stationCounts).map((label) => ({
      label,
      quantity: stationCounts[label],
    }));

    setStationData(stationArray);
  }, [filters]);

  const handleReasonClick = (data) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      reason: prevFilters.reason === data.label ? null : data.label,
    }));
  };

  const handleStationClick = (data) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      station: prevFilters.station === data.label ? null : data.label,
    }));
  };

  const handleHourClick = (data) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      hour: prevFilters.hour === data.hour ? null : data.hour,
    }));
  };

  return (
    <div>
      <h2>Attrition & Repair by Hour</h2>
      <ComposedChart
        width={800}
        height={400}
        data={chartData}
        onClick={(event) => handleHourClick(event.activePayload[0].payload)}
      >
        <XAxis dataKey="hour" tickFormatter={(hour) => hour} />
        <YAxis />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
        <Bar dataKey="repair" barSize={20} fill="#82ca9d" name="Repair" />
        <Bar dataKey="attrition" barSize={20} fill="#8884d8" name="Attrition" />
      </ComposedChart>

      <h2>Reasons by Label</h2>
      <BarChart
        width={800}
        height={400}
        data={reasonData}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        onClick={(event) => handleReasonClick(event.activePayload[0].payload)}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="label" />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" name="Quantity">
          <LabelList dataKey="quantity" position="top" />
        </Bar>
      </BarChart>

      <h2>Stations by Label</h2>
      <BarChart
        width={800}
        height={400}
        data={stationData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        onClick={(event) => handleStationClick(event.activePayload[0].payload)}
      >
        <XAxis dataKey="label" />
        <YAxis />
        <CartesianGrid stroke="#f5f5f5" />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#82ca9d" name="Quantity">
          <LabelList dataKey="quantity" position="top" />
        </Bar>
      </BarChart>
    </div>
  );
};

export default App;
