import React, { useState, useEffect } from 'react';
import { ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';
import data from './data.json';

const App = () => {
  const [chartData, setChartData] = useState([]);
  const [reasonData, setReasonData] = useState([]);
  const [stationData, setStationData] = useState([]);
  const [repairHistoryData, setRepairHistoryData] = useState([]);
  const [filterState, setFilterState] = useState({ reason: null, station: null, hour: null, smt: null }); 
  const [filters, setFilters] = useState(filterState); 

  const [smtTotals, setSmtTotals] = useState({
    SMT_A: { repair: 0, attrition: 0 },
    SMT_B: { repair: 0, attrition: 0 },
    SMT_C: { repair: 0, attrition: 0 },
  });

  const [overallTotals, setOverallTotals] = useState({ repair: 0, attrition: 0 });

  useEffect(() => {
    const processedData = data.reduce((acc, smt) => {
      const smtKey = smt.description;
      Object.entries(smt.result).forEach(([time, values]) => {
        const hour = time.slice(11, 16);
        const repair = values.repair;
        const attrition = values.attrition;
        const reasons = values.reason;
        const stations = values.station;

        const matchesFilter = (filters.reason === null || reasons.some(r => r.label === filters.reason)) &&
                              (filters.station === null || stations.some(s => s.label === filters.station)) &&
                              (filters.hour === null || filters.hour === hour) &&
                              (filters.smt === null || filters.smt === smtKey);

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

    const reasonCounts = data.reduce((acc, smt) => {
      const smtKey = smt.description;
      Object.entries(smt.result).forEach(([time, values]) => {
        const hour = time.slice(11, 16);
        const reasons = values.reason;

        const matchesFilter = (filters.hour === null || filters.hour === hour) &&
                              (filters.station === null || values.station.some(s => s.label === filters.station)) &&
                              (filters.smt === null || filters.smt === smtKey);

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

    const stationCounts = data.reduce((acc, smt) => {
      const smtKey = smt.description;
      Object.entries(smt.result).forEach(([time, values]) => {
        const hour = time.slice(11, 16);
        const stations = values.station;

        const matchesFilter = (filters.hour === null || filters.hour === hour) &&
                              (filters.reason === null || values.reason.some(r => r.label === filters.reason)) &&
                              (filters.smt === null || filters.smt === smtKey);

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

    const repairHistoryCounts = data.reduce((acc, smt) => {
      const smtKey = smt.description;
      Object.entries(smt.result).forEach(([time, values]) => {
        const hour = time.slice(11, 16);
        const repairHistories = values.repair_history;

        const matchesFilter = (filters.hour === null || filters.hour === hour) &&
                              (filters.station === null || values.station.some(s => s.label === filters.station)) &&
                              (filters.reason === null || values.reason.some(r => r.label === filters.reason)) &&
                              (filters.smt === null || filters.smt === smtKey);

        if (matchesFilter) {
          repairHistories.forEach((repairHistory) => {
            if (repairHistory.location) {
              if (!acc[repairHistory.location]) {
                acc[repairHistory.location] = {};
              }
              if (!acc[repairHistory.location][hour]) {
                acc[repairHistory.location][hour] = 0;
              }
              acc[repairHistory.location][hour] += repairHistory.quantity;
            }
          });
        }
      });

      return acc;
    }, {});

    const repairHistoryArray = Object.entries(repairHistoryCounts).map(([location, hours]) => ({
      location,
      hours: Object.entries(hours).map(([hour, quantity]) => ({ hour, quantity }))
    }));

    setRepairHistoryData(repairHistoryArray);

    let totalRep = 0;
    let totalAtt = 0;
    let smtARep = 0;
    let smtAAtt = 0;
    let smtBRep = 0;
    let smtBAtt = 0;
    let smtCRep = 0;
    let smtCAtt = 0;

    data.forEach((smt) => {
      Object.values(smt.result).forEach((timeData) => {
        totalRep += timeData.repair;
        totalAtt += timeData.attrition;

        if (smt.description === 'SMT A') {
          smtARep += timeData.repair;
          smtAAtt += timeData.attrition;
        } else if (smt.description === 'SMT B') {
          smtBRep += timeData.repair;
          smtBAtt += timeData.attrition;
        } else if (smt.description === 'SMT C') {
          smtCRep += timeData.repair;
          smtCAtt += timeData.attrition;
        }
      });
    });

    setOverallTotals({ repair: totalRep, attrition: totalAtt });
    setSmtTotals({
      SMT_A: { repair: smtARep, attrition: smtAAtt },
      SMT_B: { repair: smtBRep, attrition: smtBAtt },
      SMT_C: { repair: smtCRep, attrition: smtCAtt },
    });
  }, [filters]);

  const handleReasonClick = (data) => {
    setFilterState((prevFilters) => ({
      ...prevFilters,
      reason: prevFilters.reason === data.label ? null : data.label,
    }));
    setFilters(filterState);
  };

  const handleStationClick = (data) => {
    setFilterState((prevFilters) => ({
      ...prevFilters,
      station: prevFilters.station === data.label ? null : data.label,
    }));
    setFilters(filterState);
  };

  const handleHourClick = (data) => {
    setFilterState((prevFilters) => ({
      ...prevFilters,
      hour: prevFilters.hour === data.hour ? null : data.hour,
    }));
    setFilters(filterState);
  };

  const handleSmtClick = (smt) => {
    setFilterState((prevFilters) => ({
      ...prevFilters,
      smt: prevFilters.smt === smt ? null : smt,
    }));
    setFilters(filterState);
  };

  const handleTotalClick = () => {
    setFilterState({ reason: null, station: null, hour: null, smt: null });
    setFilters(filterState);
  };

  return (
    <div>
      <div className="card-container" style={{ display: "flex", flexDirection: "row"}}>
        <div className="card" onClick={handleTotalClick} style={{ border: "1px solid red", padding: "10px", margin: "10px", cursor: "pointer",}}>
          <h3>Total</h3>
          <p>Repair: {overallTotals.repair}</p>
          <p>Attrition: {overallTotals.attrition}</p>
        </div>
        <div className="card" onClick={() => handleSmtClick('SMT A')} style={{ border: "1px solid red", padding: "10px", margin: "10px", cursor: "pointer"}}>
          <h3>SMT A</h3>
          <p>Repair: {smtTotals.SMT_A.repair}</p>
          <p>Attrition: {smtTotals.SMT_A.attrition}</p>
        </div>
        <div className="card" onClick={() => handleSmtClick('SMT B')} style={{ border: "1px solid red", padding: "10px", margin: "10px", cursor: "pointer"}}>
          <h3>SMT B</h3>
          <p>Repair: {smtTotals.SMT_B.repair}</p>
          <p>Attrition: {smtTotals.SMT_B.attrition}</p>
        </div>
        <div className="card" onClick={() => handleSmtClick('SMT C')} style={{ border: "1px solid red", padding: "10px", margin: "10px", cursor: "pointer"}}>
          <h3>SMT C</h3>
          <p>Repair: {smtTotals.SMT_C.repair}</p>
          <p>Attrition: {smtTotals.SMT_C.attrition}</p>
        </div>
      </div>

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
        margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
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

      <h2>Repair History by Location and Hour</h2>
      <ul>
        {repairHistoryData.map((locationData) => (
          <li key={locationData.location}>
            <strong>{locationData.location}:</strong>
            <ul>
              {locationData.hours.map((hourData) => (
                <li key={hourData.hour}>
                  {hourData.hour}: {hourData.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
