import React, { useState } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const StudentChart = () => {
  const [labels, setLabels] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let label = [];
        let data = [];
        const res = await axios.get("http://localhost:4000/auth/getSelectedStudentForChart");

        res.data.map((item) => {
          label.push(item.department);
          data.push(item.count);
        });
        setLabels(label);
        setBarData(data);
      } catch (err) {
        window.alert(err);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Department",
        data: barData,
        backgroundColor: "#6600cc",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8, 
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
           <h1 style={{ textAlign: "center" }}>Department wise Placement</h1>
      <div style={{ display: "flex", justifyContent: "center", width: "650px", height: "100%" }}>
        <Bar data={data} options={options} />
      </div>
    </>
  );
};
