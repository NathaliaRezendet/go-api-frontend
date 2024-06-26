import React, { useEffect, useState } from 'react';
import { getSubscription } from '../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import { AiOutlineHome } from 'react-icons/ai'; 
import 'chart.js/auto';
import './css/Subscription.css';

const Subscription = () => {
  const [subscription, setSubscription] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    setLoading(true);
    try {
      const response = await getSubscription();
      setSubscription(response.data);
    } catch (error) {
      console.error('Error fetching Subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  // Distribuição de inscrições por MPN ID
  const subscriptionsByMpnId = subscription.reduce((acc, sub) => {
    acc[sub.mpnId] = (acc[sub.mpnId] || 0) + 1;
    return acc;
  }, {});

  const chartDataPie = {
    labels: Object.keys(subscriptionsByMpnId),
    datasets: [
      {
        label: 'Number of Subscriptions',
        data: Object.values(subscriptionsByMpnId),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Contagem de inscrições por Partner ID
  const subscriptionsByPartnerId = subscription.reduce((acc, sub) => {
    acc[sub.partnerId] = (acc[sub.partnerId] || 0) + 1;
    return acc;
  }, {});

  const chartDataBar = {
    labels: Object.keys(subscriptionsByPartnerId),
    datasets: [
      {
        label: 'Number of Subscriptions',
        data: Object.values(subscriptionsByPartnerId),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
      <h1>Inscrições</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="charts-container">
            <div className="chart">
              <h2>Distribuição de Inscrições por MPN ID</h2>
              <Pie data={chartDataPie} />
            </div>
            <div className="chart">
              <h2>Contagem de Inscrições por Partner ID</h2>
              <Bar data={chartDataBar} />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>subscriptionId</th>
                <th>SubscriptionName</th>
                <th>subscriptionDescription</th>
                <th>mpnId</th>
                <th>tier2MpnId</th>
                <th>partnerId</th>
              </tr>
            </thead>
            <tbody>
              {subscription.map((sub, index) => (
                <tr key={index}>
                  <td>{sub.subscriptionId}</td>
                  <td>{sub.SubscriptionName}</td>
                  <td>{sub.subscriptionDescription}</td>
                  <td>{sub.mpnId}</td>
                  <td>{sub.tier2MpnId}</td>
                  <td>{sub.partnerId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Subscription;
