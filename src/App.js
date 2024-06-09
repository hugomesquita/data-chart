import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart,  } from 'recharts';
import data from './dados.json';

const prepareChartData = (selectedSMT) => {
  const hourlyData = {};

  const smtData = selectedSMT ? data.SMT[selectedSMT] : data.SMT;
  
  if (smtData && smtData.attrition && smtData.repair) {
    smtData.attrition.forEach(({ hour, quantity }) => {
      if (!hourlyData[hour]) hourlyData[hour] = { hour, attrition: 0, repair: 0 };
      hourlyData[hour].attrition += quantity;
    });
    smtData.repair.forEach(({ hour, quantity }) => {
      if (!hourlyData[hour]) hourlyData[hour] = { hour, attrition: 0, repair: 0 };
      hourlyData[hour].repair += quantity;
    });
  }

  return Object.values(hourlyData);
};

const prepareStationChartData = (selectedSMT) => {
  const stationData = {};


  const smtData = selectedSMT? data.SMT[selectedSMT] : data.SMT;

  if (smtData && smtData.station) {
    smtData.station.forEach(({ hour, name, quantity }) => {
      if (!stationData[name]) stationData[name] = { name, quantity: 0 };
      stationData[name].quantity += quantity;
    });

    return Object.values(stationData);
  }

  // Add this if statement to include the total of A, B, and C when selectedSMT is null
  if (selectedSMT === null) {
    Object.values(data.SMT).forEach(smt => {
      smt.station.forEach(({ name, quantity }) => {
        if (!stationData[name]) stationData[name] = { name, quantity: 0 };
        stationData[name].quantity += quantity;
      });
    });
  }

  return Object.values(stationData);
};

const Card = ({ title, quantity, onClick }) => (
  <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', width: '200px', cursor: 'pointer' }} onClick={onClick}>
    <h3>{title}</h3>
    <p>{quantity}</p>
  </div>
);

const App = () => {
  const [selectedSMT, setSelectedSMT] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [totalAttrition, setTotalAttrition] = useState(0);
  const [totalRepair, setTotalRepair] = useState(0);
  const [totalStation, setTotalStation] = useState(0);
  const [stationChartData, setStationChartData] = useState([]); // Estado para dados do gráfico de estações
  const [selectedHour, setSelectedHour] = useState(null);

  // Calcular o total de "Attrition" e "Repair" por hora ao carregar a página
  useEffect(() => {
    const hourlyData = {};
  
    Object.keys(data.SMT).forEach((smt) => {
      data.SMT[smt].attrition.forEach(({ hour, quantity }) => {
        if (!hourlyData[hour]) hourlyData[hour] = { hour, attrition: 0, repair: 0, station: 0 };
        hourlyData[hour].attrition += quantity;
      });
      data.SMT[smt].repair.forEach(({ hour, quantity }) => {
        if (!hourlyData[hour]) hourlyData[hour] = { hour, attrition: 0, repair: 0, station: 0 };
        hourlyData[hour].repair += quantity;
      });
      data.SMT[smt].station.forEach(({ hour, quantity }) => {
        if (!hourlyData[hour]) hourlyData[hour] = { hour, attrition: 0, repair: 0, station: 0 };
        hourlyData[hour].station += quantity;
      });
    });
  
    const totalData = Object.values(hourlyData).map(({ hour, attrition, repair, station }) => ({ hour, attrition, repair, station }));
    setChartData(totalData);
  
    // Calcular o total de "Attrition" e "Repair" global
    let totalAttritionValue = 0;
    let totalRepairValue = 0;
    let totalStationValue = 0;
  
    Object.keys(data.SMT).forEach((smt) => {
      totalAttritionValue += data.SMT[smt].attrition.reduce((acc, item) => acc + item.quantity, 0);
      totalRepairValue += data.SMT[smt].repair.reduce((acc, item) => acc + item.quantity, 0);
      totalStationValue += data.SMT[smt].station.reduce((acc, item) => acc + item.quantity, 0);
    });
  
    setTotalAttrition(totalAttritionValue);
    setTotalRepair(totalRepairValue);
    setTotalStation(totalStationValue);
  
    // Adicionar esta linha para carregar a Quantidades de Estações por Nome de forma total
    setStationChartData(prepareStationChartData(null)); // Carrega total de A, B, C ao iniciar
  }, []);
  
  const handleSMTClick = (smt) => {
    if (smt === null) {
      // Calcular o total de "Attrition" e "Repair" por hora novamente
      const hourlyData = {};

      Object.keys(data.SMT).forEach((smt) => {
        data.SMT[smt].attrition.forEach(({ hour, quantity }) => {
          if (!hourlyData[hour]) hourlyData[hour] = { hour, attrition: 0, repair: 0 };
          hourlyData[hour].attrition += quantity;
        });
        data.SMT[smt].repair.forEach(({ hour, quantity }) => {
          if (!hourlyData[hour]) hourlyData[hour] = { hour, attrition: 0, repair: 0 };
          hourlyData[hour].repair += quantity;
        });
      });

      const totalData = Object.values(hourlyData).map(({ hour, attrition, repair }) => ({ hour, attrition, repair }));
      setChartData(totalData);
      setStationChartData(prepareStationChartData(null)); // Atualizar gráfico de estações
    } else {
      setSelectedSMT(smt);
      setChartData(prepareChartData(smt));
      setStationChartData(prepareStationChartData(smt)); // Atualizar gráfico de estações
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card title="Total Attrition" quantity={totalAttrition} onClick={() => handleSMTClick(null)} />
        <Card title="Total Repair" quantity={totalRepair} onClick={() => handleSMTClick(null)} />
        <Card title="Total Attrition by Hour" quantity={chartData.reduce((total, item) => total + item.attrition, 0)} onClick={() => handleSMTClick(null)} />
        <Card title="Total Repair by Hour" quantity={chartData.reduce((total, item) => total + item.repair, 0)} onClick={() => handleSMTClick(null)} />
      </div>
      <ComposedChart width={800} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="attrition" name="Attrition" stroke="#8884d8" />
        <Bar dataKey="repair" name="Repair" barSize={20} fill="#82ca9d" />
      </ComposedChart>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {Object.keys(data.SMT).map((smt, index) => (
          <Card key={index} title={smt} quantity={selectedSMT === smt ? data.SMT[smt].attrition.reduce((total, item) => total + item.quantity, 0) : data.SMT[smt].repair.reduce((total, item) => total + item.quantity, 0)} onClick={() => handleSMTClick(smt)} />
        ))}
      </div>
      
      <hr />
      <h2>Quantidades de Estações por Nome</h2>
      <BarChart width={600} height={300} data={stationChartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#82ca9d" />
      </BarChart>

    </div>
  );
};

export default App;