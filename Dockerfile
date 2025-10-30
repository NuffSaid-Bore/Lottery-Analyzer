# ----------------------------
# Stage 1: Build Frontend
# ----------------------------
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# ----------------------------
# Stage 2: Build Backend + Serve Frontend
# ----------------------------
FROM python:3.11-slim
WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY backend ./backend

# Copy data folder so the CSV is available
COPY backend/data ./backend/data

# Copy frontend build output
COPY --from=frontend-build /app/frontend/build ./frontend_build

# Expose port
EXPOSE 5000

# Start backend
CMD ["python", "backend/app/app.py"]
