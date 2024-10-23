// consumindo api
export const fetchSuppliers = async (consumo) => {
  const response = await fetch(`http://127.0.0.1:5000/fornecedores?consumo=${consumo}`);
  if (!response.ok) {
    throw new Error('Erro ao buscar fornecedores');
  }
  const data = await response.json();
  return data.fornecedores;
};
