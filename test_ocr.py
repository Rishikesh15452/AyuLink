"""
Simple test script for OCR functionality
"""

import json
import sys
import os

def mock_process_file(file_path: str) -> dict:
    """
    Mock function to simulate OCR processing
    """
    # Check if file exists
    if not os.path.exists(file_path):
        return {"error": "File not found"}
    
    # Mock OCR results
    mock_text = """Patient Name: John Doe
Date: 2023-10-15
Diagnosis: Routine Checkup
Prescription: Vitamin D 1000 IU daily
Blood Pressure: 120/80
Heart Rate: 72 bpm
Temperature: 98.6 F"""

    # Mock key-value pairs
    key_value_pairs = [
        {"key": "Patient Name", "value": "John Doe"},
        {"key": "Date", "value": "2023-10-15"},
        {"key": "Diagnosis", "value": "Routine Checkup"},
        {"key": "Prescription", "value": "Vitamin D 1000 IU daily"},
        {"key": "Blood Pressure", "value": "120/80"},
        {"key": "Heart Rate", "value": "72 bpm"},
        {"key": "Temperature", "value": "98.6 F"}
    ]
    
    return {
        "success": True,
        "file_name": os.path.basename(file_path),
        "ocr_text": mock_text,
        "key_value_pairs": key_value_pairs
    }

def main():
    """
    Main function to process files from command line.
    """
    if len(sys.argv) < 2:
        print("Usage: python test_ocr.py <file_path>")
        print("This is a mock OCR processor for testing purposes.")
        sys.exit(1)
    
    file_path = sys.argv[1]
    result = mock_process_file(file_path)
    
    # Output result as JSON
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()