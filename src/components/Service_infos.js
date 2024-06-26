import React, { useEffect, useState } from 'react';
import { getService_infos } from '../services/api';
import { AiOutlineHome } from 'react-icons/ai'; 
import './css/Service_infos.css';

const Service_infos = () => {
  const [service_infos, setService_infos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService_infos();
  }, []);

  const fetchService_infos = async () => {
    setLoading(true);
    try {
      const response = await getService_infos();
      setService_infos(response.data);
    } catch (error) {
      console.error('Error fetching Service_infos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="back-button">
        <button onClick={() => window.history.back()}>
          <AiOutlineHome /> Voltar para tela inicial
        </button>
      </div>
      <h1>Serviços</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>serviceInfo1</th>
              <th>serviceInfo2</th>
              <th>service_infosName</th>
              <th>tags</th>
              <th>additionalInfo</th>
            </tr>
          </thead>
          <tbody>
            {service_infos.map((Service_infos, index) => (
              <tr key={index}>
                <td>{Service_infos.serviceInfo1}</td>
                <td>{Service_infos.serviceInfo2}</td>
                <td>{Service_infos.Service_infosName}</td>
                <td>{Service_infos.tags}</td>
                <td>{Service_infos.additionalInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Service_infos;
