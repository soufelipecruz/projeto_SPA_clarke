import React, { createContext, useState } from 'react';
import { fetchSuppliers } from '../api';

export const SupplierContext = createContext();

export const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);

  const searchSuppliers = async (consumo) => {
    try {
      const data = await fetchSuppliers(consumo);
      setSuppliers(data);
    } catch (error) {
      setError('Erro ao carregar fornecedores.');
    }
  };

  return (
    <SupplierContext.Provider value={{ suppliers, searchSuppliers, error }}>
      {children}
      
    </SupplierContext.Provider>
  );
};
