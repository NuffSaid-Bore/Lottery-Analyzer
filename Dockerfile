# ----------------------------
# Stage 1: Build Frontend
# ----------------------------
FROM node:20 AS frontend-build

# Set working directory
WORKDIR /app/frontend

# Copy and install frontend dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend files and build
COPY frontend/ ./
RUN npm run build

# ----------------------------
# Stage 2: Build Backend + Serve Frontend
# ----------------------------
FROM python:3.11-slim

WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend ./backend

# Copy the built frontend into the backend-serving directory
COPY --from=frontend-build /app/frontend/build ./frontend_build

# Expose Flask port
EXPOSE 5000

# Run Flask app
CMD ["python", "backend/app/app.py"]
