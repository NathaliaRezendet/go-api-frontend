import React, { useEffect, useState } from 'react';
import { getClients } from '../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import { AiOutlineHome } from 'react-icons/ai'; 
import ReactPaginate from 'react-paginate'; 
import 'chart.js/auto';
import './css/Clients.css';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0); 
  const clientsPerPage = 10; 

  useEffect(() => {
    fetchClients();
  }, [pageNumber]); 

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await getClients();
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const clientsByCountry = clients.reduce((acc, client) => {
    acc[client.customerCountry] = (acc[client.customerCountry] || 0) + 1;
    return acc;
  }, {});

  const chartDataBar = {
    labels: Object.keys(clientsByCountry),
    datasets: [
      {
        label: 'Number of Clients',
        data: Object.values(clientsByCountry),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const clientsByDomain = clients.reduce((acc, client) => {
    acc[client.customerDomainName] = (acc[client.customerDomainName] || 0) + 1;
    return acc;
  }, {});

  const chartDataPie = {
    labels: Object.keys(clientsByDomain),
    datasets: [
      {
        label: 'Clients by Domain',
        data: Object.values(clientsByDomain),
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

  const pageCount = Math.ceil(clients.length / clientsPerPage);
  const offset = pageNumber * clientsPerPage;
  const currentPageClients = clients.slice(offset, offset + clientsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="back-button">
        <button onClick={() => window.history.back()}>
          <AiOutlineHome /> Voltar para tela inicial
        </button>
      </div>
      <h1>Clientes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="clients-container">
          <div className="charts-container">
            <div className="chart">
              <h2>Distribuição de Clientes por País</h2>
              <Bar data={chartDataBar} />
            </div>
            <div className="chart">
              <h2>Quantidade de Clientes por Domínio</h2>
              <Pie data={chartDataPie} />
            </div>
          </div>
          <table className="clients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Customer Name</th>
                <th>Customer Domain Name</th>
                <th>Customer Country</th>
              </tr>
            </thead>
            <tbody>
              {currentPageClients.map((client, index) => (
                <tr key={index}>
                  <td>{client.id}</td>
                  <td>{client.customerId}</td>
                  <td>{client.customerName}</td>
                  <td>{client.customerDomainName}</td>
                  <td>{client.customerCountry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ReactPaginate
        previousLabel={'← Previous'}
        nextLabel={'Next →'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Clients;
