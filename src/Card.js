import React from 'react';

const Card = ({ title, value, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Card;
