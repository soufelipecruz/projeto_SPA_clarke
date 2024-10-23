import React, { useState, useContext } from 'react';
import { SupplierContext } from '../context/SupplierContext';

const SearchBar = () => {
  const [consumo, setConsumo] = useState('');
  const { searchSuppliers } = useContext(SupplierContext);

  const handleSearch = () => {
    if (consumo) {
      searchSuppliers(consumo);
    }
  };

  return (
    <div className="search-bar">
      <h3>Informe seu consumo de energia: </h3>
      <input
        type="text"
        placeholder="Ex.: 200"
        value={consumo}
        onChange={(e) => setConsumo(e.target.value)}
      />
      <button onClick={handleSearch}>Pesquisar</button>
    </div>
  );
};

export default SearchBar;
