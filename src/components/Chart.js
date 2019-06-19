import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";

const API = "http://localhost:3001/tables";

const Chart = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  const fetchAPI = async () => {
    const response = await fetch(API);
    return await response.json();
  };

  useEffect(
    () =>
      fetchAPI().then(data => {
        const dataLabel = data[0].data.map(label => label.name);
        const dataChart = data[0].data.map(value => value.value);
        setValues(dataChart);
        setLabels(dataLabel);
      }),
    []
  );

  return (
    <div className="chart">
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              label: "name",
              data: values,
              backgroundColor: [
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)"
              ],
              borderColor: [
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)"
              ],
              borderWidth: 1
            }
          ]
        }}
      />
    </div>
  );
};

export default Chart;
