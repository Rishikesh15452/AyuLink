Ayulink OCR Backend Setup Instructions
=====================================

This document explains how to set up and run the OCR backend service for Ayulink.

Prerequisites:
--------------
1. Python 3.7 or higher
2. pip (Python package installer)

Setup Instructions:
-------------------
1. Install the required Python packages:
   pip install -r requirements.txt

2. Install Tesseract OCR:
   - Windows: Download from https://github.com/UB-Mannheim/tesseract/wiki
   - macOS: brew install tesseract
   - Linux: sudo apt install tesseract-ocr

3. Run the backend service:
   python ocr_backend.py

API Endpoints:
--------------
- GET  / - Health check endpoint
- POST /upload - Upload and process files with OCR
- GET  /results/<filename> - Retrieve OCR results
- GET  /uploads/<filename> - Retrieve uploaded files

Frontend Integration:
---------------------
The frontend dashboard already includes:
- File upload section with drag-and-drop support
- OCR results display section
- Mock OCR processing simulation

To connect the frontend to the backend:
1. Start the backend service (python ocr_backend.py)
2. Update the JavaScript uploadFiles() function in HealthTracker.js
   to send files to the backend instead of using mock processing

Current Limitations:
--------------------
- This is a demonstration implementation
- In a production environment, you would need:
  * Authentication and authorization
  * Rate limiting
  * File type validation
  * Error handling improvements
  * Database storage for results
  * Proper logging