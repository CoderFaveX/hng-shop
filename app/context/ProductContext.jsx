import React, { createContext, useState, useEffect } from 'react';
import { fetchProducts } from '../services/Api';
import { isAxiosError } from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products1 = await fetchProducts(1);
        const products2 = await fetchProducts(2);
        let products = [...products1, ...products2];
        setProducts(products);
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    (async () => {
      await getProducts();
    })();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};