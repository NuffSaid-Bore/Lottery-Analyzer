from flask import Flask, jsonify, request, send_from_directory
import os
import pandas as pd
from flask_cors import CORS
from analysis import LotteryAnalyzer

app = Flask(__name__)
CORS(app)

csv_path = os.path.join(os.path.dirname(__file__), "../data/past_draws.csv")
csv_path = os.path.abspath(csv_path)

if not os.path.exists(csv_path):
    print(f"⚠️ CSV file not found at {csv_path}")
else:
    print(f"✅ Loaded CSV from {csv_path}")


analyzer = LotteryAnalyzer(csv_path)

@app.route("/api/frequency")
def frequency():
    return jsonify(analyzer.frequency.to_dict())

@app.route("/api/hotcold")
def hotcold():
    return jsonify({
        "hot": analyzer.hot_numbers.to_dict(),
        "cold": analyzer.cold_numbers.to_dict()
    })

@app.route("/api/rolling")
def rolling():
    return jsonify(analyzer.rolling_frequency().to_dict())

@app.route("/api/recommended")
def recommended():
    return jsonify(analyzer.pick_numbers())


@app.route("/api/heatmap")
def heatmap():
    heatmap_data = analyzer.df.apply(pd.Series.value_counts, axis=0).fillna(0)
    return jsonify({
        "x_labels": list(heatmap_data.columns), 
        "y_labels": list(map(str, heatmap_data.index)),
        "data": heatmap_data.values.tolist()  
    })
    
    
@app.route("/api/analyze", methods=["POST"])
def analyze_file():
    if "csv_file" in request.files:
        file = request.files["csv_file"]
        analyzer_uploaded = LotteryAnalyzer(file.stream)
    else:
        analyzer_uploaded = analyzer
        
        print("Frequency:", analyzer_uploaded.frequency.head())
        print("Hot:", analyzer_uploaded.hot_numbers.head())


    return jsonify({
        "frequency": analyzer_uploaded.frequency.to_dict(),
        "hot": analyzer_uploaded.hot_numbers.to_dict(),
        "cold": analyzer_uploaded.cold_numbers.to_dict(),
        "rolling": analyzer_uploaded.rolling_frequency().to_dict(),
        "recommended": analyzer_uploaded.pick_numbers()
    })
    
frontend_path = os.path.join(os.getcwd(), "frontend_build")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    full_path = os.path.join(frontend_path, path)
    if path != "" and os.path.exists(full_path):
        return send_from_directory(frontend_path, path)
    return send_from_directory(frontend_path, "index.html")



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

