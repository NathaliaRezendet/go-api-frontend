import React, { useEffect, useState } from 'react';
import { getPartner } from '../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import { AiOutlineHome } from 'react-icons/ai'; 
import 'chart.js/auto';
import './css/Partner.css';

const Partner = () => {
  const [partner, setPartner] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartner();
  }, []);

  const fetchPartner = async () => {
    setLoading(true);
    try {
      const response = await getPartner();
      setPartner(response.data);
    } catch (error) {
      console.error('Error fetching Partner:', error);
    } finally {
      setLoading(false);
    }
  };

  const partnersByPublisher = partner.reduce((acc, partner) => {
    acc[partner.publisherName] = (acc[partner.publisherName] || 0) + 1;
    return acc;
  }, {});

  const chartDataBar = {
    labels: Object.keys(partnersByPublisher),
    datasets: [
      {
        label: 'Number of Partners',
        data: Object.values(partnersByPublisher),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const avgCreditPercentage = partner.reduce((acc, partner) => {
    acc[partner.partnerName] = 
      (acc[partner.partnerName] || []).concat(partner.partnerEarnedCreditPercentage);
    return acc;
  }, {});

  const avgCreditPercentageData = Object.keys(avgCreditPercentage).map(key => {
    const values = avgCreditPercentage[key];
    const sum = values.reduce((a, b) => a + b, 0);
    return sum / values.length;
  });

  const chartDataPie = {
    labels: Object.keys(avgCreditPercentage),
    datasets: [
      {
        label: 'Average Credit Percentage',
        data: avgCreditPercentageData,
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

  return (
    <div>
      <div className="back-button">
        <button onClick={() => window.history.back()}>
          <AiOutlineHome /> Voltar para tela inicial
        </button>
      </div>
      <h1>Parceiros</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="charts-container">
            <div className="chart">
              <h2>Distribuição de Parceiros por Publisher</h2>
              <Bar data={chartDataBar} />
            </div>
            <div className="chart">
              <h2>Média da Porcentagem de Crédito Ganhado pelos Parceiros</h2>
              <Pie data={chartDataPie} />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>partnerId</th>
                <th>partnerName</th>
                <th>publisherName</th>
                <th>publisherId</th>
                <th>partnerEarnedCreditPercentage</th>
              </tr>
            </thead>
            <tbody>
              {partner.map((partner, index) => (
                <tr key={index}>
                  <td>{partner.id}</td>
                  <td>{partner.partnerId}</td>
                  <td>{partner.partnerName}</td>
                  <td>{partner.publisherName}</td>
                  <td>{partner.publisherId}</td>
                  <td>{partner.partnerEarnedCreditPercentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Partner;
