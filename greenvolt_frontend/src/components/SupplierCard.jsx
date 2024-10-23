import React from 'react';

const SupplierCard = ({ supplier }) => {
  return (
    <div className="supplier-card">
      <img src={supplier.logo || '/assets/logo-placeholder.png'} alt={supplier.nome} />
      <div>
        <h3>{supplier.nome}</h3>
        <p>Estado de origem: {supplier.estado_origem}</p>
        <p>Custo por kWh: R$ {supplier.custo_por_kWh}</p>
        <p>Limite mínimo de kWh: {supplier.limite_minimo_kWh}</p>
        <p>Nº de clientes: {supplier.numero_total_clientes}</p>
        <p>Avaliação dos clientes: {supplier.avaliacao_media}</p>
        <button>Visitar empresa</button>
      </div>
    </div>
  );
};

export default SupplierCard;
