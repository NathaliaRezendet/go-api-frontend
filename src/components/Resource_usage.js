import React, { useEffect, useState } from "react";
import { getResource_usage } from "../services/api";
import { Line } from "react-chartjs-2";
import { AiOutlineHome } from "react-icons/ai";
import "./css/Resource_usage.css";

const Resource_usage = () => {
  const [resource_usage, setResource_usage] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResource_usage();
  }, []);

  const fetchResource_usage = async () => {
    setLoading(true);
    try {
      const response = await getResource_usage();
      setResource_usage(response.data);
    } catch (error) {
      console.error("Error fetching Resource_usage:", error);
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = () => {
    const dates = resource_usage.map((data) => data.usageDate);
    const values = resource_usage.map((data) => data.meterId);

    return {
      labels: dates,
      datasets: [
        {
          label: "Uso de Recursos",
          data: values,
          fill: false,
          borderColor: "#4CAF50",
        },
      ],
    };
  };

  return (
    <div>
      <div className="back-button">
        <button onClick={() => window.history.back()}>
          <AiOutlineHome /> Voltar para tela inicial
        </button>
      </div>
      <div className="chart-container">
        <Line data={prepareChartData()} />
      </div>
      <h1>Uso de Recursos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>usageDate</th>
                <th>meterType</th>
                <th>meterCategory</th>
                <th>meterId</th>
                <th>meterSubCategory</th>
                <th>meterName</th>
                <th>meterRegion</th>
                <th>unit</th>
                <th>resourceLocation</th>
                <th>consumedService</th>
                <th>resourceGroup</th>
                <th>resourceURI</th>
              </tr>
            </thead>
            <tbody>
              {resource_usage.map((Resource_usage, index) => (
                <tr key={index}>
                  <td>{Resource_usage.usageDate}</td>
                  <td>{Resource_usage.meterType}</td>
                  <td>{Resource_usage.meterCategory}</td>
                  <td>{Resource_usage.meterId}</td>
                  <td>{Resource_usage.meterSubCategory}</td>
                  <td>{Resource_usage.meterName}</td>
                  <td>{Resource_usage.meterRegion}</td>
                  <td>{Resource_usage.unit}</td>
                  <td>{Resource_usage.resourceLocation}</td>
                  <td>{Resource_usage.consumedService}</td>
                  <td>{Resource_usage.resourceGroup}</td>
                  <td>{Resource_usage.resourceURI}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Resource_usage;
