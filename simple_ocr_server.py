"""
Simple OCR Server for Ayulink
This script provides a basic HTTP server that demonstrates OCR processing.
"""

import http.server
import socketserver
import json
import os
import urllib.parse
from ocr_processor import process_file

PORT = 8000

class OCRHandler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            
            html_content = """
            <!DOCTYPE html>
            <html>
            <head>
                <title>Ayulink OCR Service</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .container { max-width: 800px; margin: 0 auto; }
                    h1 { color: #4361ee; }
                    .status { padding: 20px; background: #f0f8ff; border-radius: 5px; }
                    .endpoint { margin: 10px 0; padding: 10px; background: #f5f5f5; border-left: 4px solid #4361ee; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Ayulink OCR Service</h1>
                    <div class="status">
                        <p><strong>Status:</strong> Running</p>
                        <p>This is a demonstration OCR service for Ayulink.</p>
                    </div>
                    
                    <h2>Available Endpoints:</h2>
                    <div class="endpoint">
                        <strong>GET /</strong>
                        <p>Returns this status page</p>
                    </div>
                    <div class="endpoint">
                        <strong>POST /upload</strong>
                        <p>Upload a file for OCR processing</p>
                        <p>Parameters: file (multipart form data)</p>
                    </div>
                    <div class="endpoint">
                        <strong>GET /results</strong>
                        <p>Get mock OCR results</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            self.wfile.write(html_content.encode())
            
        elif self.path == '/results':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            # Mock OCR results
            mock_results = {
                "message": "Mock OCR results",
                "filename": "sample_document.jpg",
                "ocr_result": {
                    "success": True,
                    "file_name": "sample_document.jpg",
                    "ocr_text": "Patient Name: John Doe\\nDate: 2023-10-15\\nDiagnosis: Routine Checkup\\nPrescription: Vitamin D 1000 IU daily",
                    "key_value_pairs": [
                        {"key": "Patient Name", "value": "John Doe"},
                        {"key": "Date", "value": "2023-10-15"},
                        {"key": "Diagnosis", "value": "Routine Checkup"},
                        {"key": "Prescription", "value": "Vitamin D 1000 IU daily"}
                    ]
                }
            }
            
            self.wfile.write(json.dumps(mock_results, indent=2).encode())
            
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    def do_POST(self):
        if self.path == '/upload':
            # Get the content length
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # For simplicity, we're just returning mock results
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            mock_result = {
                "message": "File uploaded and processed successfully",
                "filename": "uploaded_file.jpg",
                "ocr_result": {
                    "success": True,
                    "file_name": "uploaded_file.jpg",
                    "ocr_text": "This is a mock OCR result. In a real implementation, this would contain the actual text extracted from the uploaded file.",
                    "key_value_pairs": [
                        {"key": "Document Type", "value": "Medical Report"},
                        {"key": "Processing Status", "value": "Success"}
                    ]
                }
            }
            
            self.wfile.write(json.dumps(mock_result, indent=2).encode())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

def run_server():
    with socketserver.TCPServer(("", PORT), OCRHandler) as httpd:
        print(f"Ayulink OCR Server running at http://localhost:{PORT}/")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    run_server()