import React, { useEffect, useState } from 'react';
import { getBilling } from '../services/api';
import { Line, Bar } from 'react-chartjs-2';
import { AiOutlineHome } from 'react-icons/ai'; 
import 'chart.js/auto';
import './css/Billing.css';

const Billing = () => {
  const [billing, setBilling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBilling();
  }, []);

  const fetchBilling = async () => {
    setLoading(true);
    try {
      const response = await getBilling();
      setBilling(response.data);
    } catch (error) {
      console.error('Error fetching Billing:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartDataLine = {
    labels: billing.map((item) => new Date(item.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'Billing Pre-Tax Total',
        data: billing.map((item) => item.billingPreTaxTotal),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const chargeTypeData = billing.reduce((acc, item) => {
    const { chargeType, quantity } = item;
    acc[chargeType] = (acc[chargeType] || 0) + quantity;
    return acc;
  }, {});

  const chartDataBar = {
    labels: Object.keys(chargeTypeData),
    datasets: [
      {
        label: 'Quantity by Charge Type',
        data: Object.values(chargeTypeData),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
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
      <h1>Pagamentos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="charts-container">
            <div className="chart">
              <h2>Evolução do Total de Pré-Impostos de Faturamento</h2>
              <Line data={chartDataLine} />
            </div>
            <div className="chart">
              <h2>Distribuição das Quantidades por Tipo de Cobrança</h2>
              <Bar data={chartDataBar} />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Charge Type</th>
                <th>Quantity</th>
                <th>Unit Type</th>
                <th>Billing Pre-Tax Total</th>
                <th>Billing Currency</th>
                <th>Pricing Pre-Tax Total</th>
                <th>Pricing Currency</th>
              </tr>
            </thead>
            <tbody>
              {billing.map((billing, index) => (
                <tr key={index}>
                  <td>{billing.id}</td>
                  <td>{billing.chargeType}</td>
                  <td>{billing.quantity}</td>
                  <td>{billing.unitType}</td>
                  <td>{billing.billingPreTaxTotal}</td>
                  <td>{billing.billingCurrency}</td>
                  <td>{billing.pricingPreTaxTotal}</td>
                  <td>{billing.pricingCurrency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Billing;
