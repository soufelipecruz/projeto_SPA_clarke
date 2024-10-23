import React from 'react';
import { SupplierProvider } from './context/SupplierContext';
import SearchBar from './components/SearchBar';
import SupplierList from './components/SupplierList';
import './styles/App.css';

function App() {
  return (
    <SupplierProvider>
      <div className="app">
        <h1>GreenVolt</h1>
        <SearchBar />
        <SupplierList />
      </div>
    </SupplierProvider>
  );
}

export default App;
