import React, { useEffect, useState } from "react";
import HeatMap from "react-heatmap-grid";
import axios from "axios";

function HeatmapChart() {
  const [xLabels, setXLabels] = useState([]);
  const [yLabels, setYLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/heatmap").then(res => {
      setXLabels(res.data.x_labels);
      setYLabels(res.data.y_labels);
      setData(res.data.data);
    });
  }, []);

  return (
    <div style={{ margin: "50px" }}>
      <h2>Heatmap of Numbers Across Draw Positions</h2>
      {data.length > 0 && (
        <HeatMap
          xLabels={xLabels}
          yLabels={yLabels}
          data={data}
          height={30}
          squares
          cellStyle={(background, value, min, max, data, x, y) => ({
            background: `rgba(255, 0, 0, ${value / (max || 1)})`,
            fontSize: "12px",
            color: "#000"
          })}
          cellRender={(value) => value && <span>{value}</span>}
        />
      )}
    </div>
  );
}

export default HeatmapChart;
