from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from io import BytesIO
from app.analysis import LotteryAnalyzer

app = FastAPI(title="Lottery Analyzer API")

# Enable CORS for frontend
origins = ["*"]  # Replace "*" with your frontend URL in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(csv_file: UploadFile = File(...)):
    contents = await csv_file.read()
    df = pd.read_csv(BytesIO(contents))
    analyzer = LotteryAnalyzer(BytesIO(contents))
    
    stats = analyzer.get_stats()
    recommended = analyzer.pick_numbers()
    
    return {"stats": stats, "recommended_numbers": recommended}
