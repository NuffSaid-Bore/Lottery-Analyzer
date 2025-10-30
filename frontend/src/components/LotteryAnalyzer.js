import { useEffect, useState } from "react";
import axios from "axios";
import FrequencyChart from "./FrequencyChart";
import HotColdChart from "./HotColdChart";
import RollingChart from "./RollingChart";
import HeatmapChart from "./HeatmapChart";
import Spinner1 from "./spinner";

function LotteryAnalyzer() {
  const [frequency, setFrequency] = useState({});
  const [hotNumbers, setHotNumbers] = useState({});
  const [coldNumbers, setColdNumbers] = useState({});
  const [rollingFreq, setRollingFreq] = useState({});
  const [recommendedNumbers, setRecommendedNumbers] = useState([]);
  const [file, setFile] = useState(null);
  const [useBackendDataset, setUseBackendDataset] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  fetchRecommendedNumbers();
}, []);



  const fetchRecommendedNumbers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/recommended");
      setRecommendedNumbers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleAnalyze = async () => {
    const formData = new FormData();
    if (!useBackendDataset && file) {
      formData.append("csv_file", file);
    }

    try {
       setLoading(true);
      const res = await axios.post("/api/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFrequency(res.data.frequency || {});
      setHotNumbers(res.data.hot || {});
      setColdNumbers(res.data.cold || {});
      setRollingFreq(res.data.rolling || {});
      setRecommendedNumbers(res.data.recommended || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
    fetchRecommendedNumbers();
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🎲 Lottery Dashboard</h1>

      <div
        style={{
          textAlign: "center",
          margin: "30px auto",
          padding: "20px",
          maxWidth: "600px",
          background: "#f9f9f9",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Dataset Selection</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "1em",
              cursor: "pointer",
            }}
          >
           <input
              type="checkbox"
              checked={useBackendDataset}
              onChange={(e) => setUseBackendDataset(e.target.checked)}
            />
            Use backend dataset
          </label>

          
          <input
              type="file"
              accept=".csv"
              disabled={useBackendDataset}
              onChange={(e) => setFile(e.target.files[0])}
              style={{
                padding: "6px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                backgroundColor: useBackendDataset ? "#f0f0f0" : "#fff",
                cursor: useBackendDataset ? "not-allowed" : "pointer",
              }}
          />

          
          <button
            onClick={handleAnalyze}
            style={{
              backgroundColor: "#7e52d1ff",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#7e52d1ff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
          >
            Analyze
          </button>
        </div>

        {loading && <Spinner1 />}

        <div>
          <h2>Recommended Numbers</h2>
          <p style={{ fontSize: "1.5em", fontWeight: "bold", color: "#7e52d1ff" }}>
            {recommendedNumbers.length > 0
              ? recommendedNumbers.join(", ")
              : "No recommendations available"}
          </p>
        </div>
      </div>


      <div className="dashboard-grid">
        <div className="dashboard-item"><FrequencyChart /></div>
        <div className="dashboard-item"><HotColdChart /></div>
        <div className="dashboard-item"><RollingChart /></div>
        <div className="dashboard-item"><HeatmapChart /></div>
      </div>
    </div>
  );
}

export default LotteryAnalyzer;
