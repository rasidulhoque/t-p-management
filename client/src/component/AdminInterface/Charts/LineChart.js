import React, { useState, useEffect } from "react";
import { Chart as ChartJS, PieController, CategoryScale, Tooltip, Legend, ArcElement } from "chart.js";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(PieController, CategoryScale, Tooltip, Legend, ArcElement);

export const LineChart = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let label = [];
        let pieData = [];
        const res = await axios.get("http://localhost:4000/auth/getPlacementsByCompany");

        res.data.map((item) => {
          label.push(item.company_name);
          pieData.push(item.num_students_selected);
        });
        setLabels(label);
        setData(pieData);
      } catch (err) {
        window.alert(err);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: [
          "#6600cc",
          "#00cc66",
          "#cc6600",
          "#0099cc",
          "#cc0066",
          "#0066cc",
          "#cc3300",
          "#0033cc",
          "#cc0000",
          "#0000cc",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <>
      <h1  style={{ textAlign: "center" }}>Company-wise Placed Students</h1>
       <div style={{ display: "flex", justifyContent: "center", width: "500px", height:"500 px" }}>
        <Doughnut data={chartData} options={options} />
      </div>
    </>
  );
};
