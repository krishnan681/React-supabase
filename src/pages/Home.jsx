import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const Home = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    let { data, error } = await supabase.from('products').select('*');
    if (error) console.error('Error:', error);
    else setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.image_url} alt={product.name} width="150" />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
