import React, { useEffect, useState } from "react";
import { getBenefits } from "../services/api";
import { Line, Bar } from "react-chartjs-2";
import { AiOutlineHome } from 'react-icons/ai'; 
import "chart.js/auto";
import "./css/Benefits.css";

const Benefits = () => {
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBenefits();
  }, []);

  const fetchBenefits = async () => {
    setLoading(true);
    try {
      const response = await getBenefits();
      setBenefits(response.data);
    } catch (error) {
      console.error("Error fetching benefits:", error);
    } finally {
      setLoading(false);
    }
  };

  const chartDataLine = {
    labels: benefits.map((benefit) =>
      new Date(benefit.CreatedAt).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Effective Unit Price",
        data: benefits.map((benefit) => benefit.effectiveUnitPrice),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const benefitsByMonth = benefits.reduce((acc, benefit) => {
    const month = new Date(benefit.CreatedAt).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const chartDataBar = {
    labels: Object.keys(benefitsByMonth),
    datasets: [
      {
        label: "Number of Benefits",
        data: Object.values(benefitsByMonth),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
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
      <h1>Benefícios</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="charts-container">
            <div className="chart">
              <h2>Gráfico do Preço Unitário Efetivo</h2>
              <Line data={chartDataLine} />
            </div>
            <div className="chart">
              <h2>Gráfico de Contagem de Benefícios por Mês</h2>
              <Bar data={chartDataBar} />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>DeletedAt</th>
                <th>effectiveUnitPrice</th>
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit, index) => (
                <tr key={index}>
                  <td>{benefit.ID}</td>
                  <td>{benefit.CreatedAt}</td>
                  <td>{benefit.UpdatedAt}</td>
                  <td>{benefit.DeletedAt}</td>
                  <td>{benefit.effectiveUnitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Benefits;
