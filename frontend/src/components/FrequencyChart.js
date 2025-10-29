import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import axios from "axios";

function FrequencyChart() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/frequency")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const chartData = Object.keys(data).map(key => ({
    number: key,
    count: data[key]
  }));

  return (
    <div>
      <h2>Number Frequency</h2>
      {chartData.length > 0 ? (
        <BarChart width={500} height={300} data={chartData}>
          <XAxis dataKey="number" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FrequencyChart;
