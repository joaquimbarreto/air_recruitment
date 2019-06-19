import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "../App.css";

const API = "http://localhost:3001/tables";

const Chart = () => {
  const [labels, setLabels] = useState([]);
  const [values1, setValues1] = useState([]);
  const [values2, setValues2] = useState([]);
  const [valuesTotal, setValuesTotal] = useState([]);
  const [toggle, setToggle] = useState(true);

  const fetchAPI = async () => {
    const response = await fetch(API);
    return await response.json();
  };

  useEffect(
    () =>
      fetchAPI().then(data => {
        const dataLabel = data[0].data.map(label => label.name);
        const dataChart1 = data[0].data.map(value => value.value);
        const dataChart2 = data[1].data.map(value => value.value);
        setValues1(dataChart1);
        setValues2(dataChart2);
        setValuesTotal(dataChart1);
        setLabels(dataLabel);
      }),
    []
  );

  const handleClick = () => {
    getValuesSumTotals();
    if (toggle === false) {
      return setToggle(true);
    }
    setToggle(false);
  };

  const getValuesSumTotals = () => {
    if (toggle === true) {
      const sum = values1.map((num, idx) => {
        return num + values2[idx];
      });
      return setValuesTotal(sum);
    }
    setValuesTotal(values1);
  };

  return (
    <div className="chart">
      <Doughnut
        data={{
          labels: labels,
          datasets: [
            {
              label: "name",
              data: valuesTotal,
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
      <button className="button" onClick={() => handleClick()}>
        {toggle ? "Table 1" : "Table 1 & 2"}
      </button>
    </div>
  );
};

export default Chart;
