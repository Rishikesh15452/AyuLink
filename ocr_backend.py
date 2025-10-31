"""
Backend OCR Service for Ayulink
This script provides a simple HTTP server that handles OCR processing.
"""

# Try to import Flask, but handle cases where it's not available
try:
    from flask import Flask, request, jsonify, send_from_directory
    FLASK_AVAILABLE = True
except ImportError:
    print("Flask not available. Please install it with: pip install flask")
    FLASK_AVAILABLE = False
    # Create mock classes for development
    class MockApp:
        def __init__(self, *args, **kwargs):
            pass
        def route(self, *args, **kwargs):
            return lambda x: x
    Flask = MockApp

# Try to import the OCR processor, but handle cases where dependencies are not available
try:
    from ocr_processor import process_file
    OCR_AVAILABLE = True
except Exception as e:
    print(f"OCR processor not available: {e}")
    OCR_AVAILABLE = False
    
    def process_file(file_path):
        # Mock implementation
        return {
            "success": True,
            "file_name": file_path,
            "ocr_text": "Mock OCR result: This is a sample text extracted from the image.\nPatient Name: John Doe\nDate: 2023-10-15\nDiagnosis: Routine Checkup",
            "key_value_pairs": [
                {"key": "Patient Name", "value": "John Doe"},
                {"key": "Date", "value": "2023-10-15"},
                {"key": "Diagnosis", "value": "Routine Checkup"}
            ]
        }

import os
import json
import base64

if FLASK_AVAILABLE:
    app = Flask(__name__)
else:
    app = Flask(__name__)

# Configuration
UPLOAD_FOLDER = 'uploads'
OCR_RESULTS_FOLDER = 'ocr_results'
ALLOWED_EXTENSIONS = {'pdf', 'jpeg', 'jpg'}

# Create directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OCR_RESULTS_FOLDER, exist_ok=True)

if FLASK_AVAILABLE:
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return jsonify({"message": "Ayulink OCR Backend Service", "status": "running"})

@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    # If user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        # Save file
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # Process with OCR
        result = process_file(file_path)
        
        # Save result
        result_filename = f"{os.path.splitext(filename)[0]}_ocr.json"
        result_path = os.path.join(OCR_RESULTS_FOLDER, result_filename)
        
        with open(result_path, 'w') as f:
            json.dump(result, f, indent=2)
        
        # Return result
        return jsonify({
            "message": "File processed successfully",
            "filename": filename,
            "result_file": result_filename,
            "ocr_result": result
        })
    
    return jsonify({"error": "File type not allowed"}), 400

@app.route('/results/<filename>')
def get_result(filename):
    try:
        result_path = os.path.join(OCR_RESULTS_FOLDER, filename)
        with open(result_path, 'r') as f:
            result = json.load(f)
        return jsonify(result)
    except FileNotFoundError:
        return jsonify({"error": "Result not found"}), 404

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    if not FLASK_AVAILABLE:
        print("Flask is not installed. Please install it with: pip install flask")
        print("Running in mock mode for development...")
        # Simulate some functionality
        input("Press Enter to exit...")
    else:
        print("Starting Ayulink OCR Backend Service...")
        print("Endpoints:")
        print("  GET  / - Health check")
        print("  POST /upload - Upload and process file")
        print("  GET  /results/<filename> - Get OCR results")
        print("  GET  /uploads/<filename> - Get uploaded file")
        print("\nTo run with actual OCR, install pytesseract:")
        print("  pip install pytesseract opencv-python")
        app.run(host='0.0.0.0', port=5000, debug=True)