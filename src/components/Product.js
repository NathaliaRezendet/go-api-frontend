import React, { useEffect, useState } from 'react';
import { getProduct } from '../services/api';
import { Bar, Line } from 'react-chartjs-2';
import { AiOutlineHome } from 'react-icons/ai'; 
import 'chart.js/auto';
import './css/Product.css';

const Product = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await getProduct();
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching Product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Quantidade de produtos por SKU
  const productsBySku = product.reduce((acc, product) => {
    acc[product.skuId] = (acc[product.skuId] || 0) + 1;
    return acc;
  }, {});

  const chartDataBar = {
    labels: Object.keys(productsBySku),
    datasets: [
      {
        label: 'Number of Products',
        data: Object.values(productsBySku),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Distribuição de produtos por data de início de cobrança
  const productsByStartDate = product.reduce((acc, product) => {
    const date = new Date(product.chargeStartDate).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartDataLine = {
    labels: Object.keys(productsByStartDate),
    datasets: [
      {
        label: 'Number of Products',
        data: Object.values(productsByStartDate),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div>
      <div className="back-button">
        <button onClick={() => window.history.back()}>
          <AiOutlineHome /> Voltar para tela inicial
        </button>
      </div>
      <h1>Produtos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="charts-container">
            <div className="chart">
              <h2>Quantidade de Produtos por SKU</h2>
              <Bar data={chartDataBar} />
            </div>
            <div className="chart">
              <h2>Distribuição de Produtos por Data de Início de Cobrança</h2>
              <Line data={chartDataLine} />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ProductId</th>
                <th>skuId</th>
                <th>availabilityId</th>
                <th>productName</th>
                <th>chargeStartDate</th>
                <th>chargeEndDate</th>
              </tr>
            </thead>
            <tbody>
              {product.map((Product, index) => (
                <tr key={index}>
                  <td>{Product.productId}</td>
                  <td>{Product.skuId}</td>
                  <td>{Product.availabilityId}</td>
                  <td>{Product.productName}</td>
                  <td>{Product.chargeStartDate}</td>
                  <td>{Product.chargeEndDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Product;
