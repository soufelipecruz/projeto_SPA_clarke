import React, { useContext } from 'react';
import { SupplierContext } from '../context/SupplierContext';
import SupplierCard from './SupplierCard';

const SupplierList = () => {
  const { suppliers, error } = useContext(SupplierContext);

  return (
    <div className="supplier-list">
      {error && <p>{error}</p>}
      {suppliers.length > 0 ? (
        suppliers.map((supplier, index) => (
          <SupplierCard key={index} supplier={supplier} />
        ))
      ) : (
        <p>Nenhum fornecedor encontrado</p>
      )}
    </div>
  );
};

export default SupplierList;
