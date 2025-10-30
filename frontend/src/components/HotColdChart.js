import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import axios from "axios";

function HotColdChart() {
  const [data, setData] = useState({ hot: {}, cold: {} });

  useEffect(() => {
    axios.get("/api/hotcold")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const hot = data.hot || {};
  const cold = data.cold || {};

  const numbers = new Set([...Object.keys(hot), ...Object.keys(cold)]);
  const chartData = Array.from(numbers).map((num) => ({
    number: num,
    count: hot[num] || cold[num] || 0,
    fill: hot[num] ? "red" : cold[num] ? "blue" : "grey",
  }));

  return (
    <div>
      <h2>Hot & Cold Numbers</h2>
      {chartData.length > 0 ? (
        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="number" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      ) : (
        <p>Loading...</p>
      )}
      <p>Red = Hot, Blue = Cold, Grey = Neutral</p>
    </div>
  );
}

export default HotColdChart;
