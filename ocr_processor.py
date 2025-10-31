"""
OCR Processor for Ayulink
This script processes uploaded files and extracts text using OCR.
"""

import os
import json
import sys
from typing import Dict, List, Tuple

# Try to import OpenCV and pytesseract, but handle cases where they're not available
try:
    import cv2
    import numpy as np
    OPENCV_AVAILABLE = True
except ImportError:
    print("OpenCV not available, image preprocessing will be skipped")
    cv2 = None
    np = None
    OPENCV_AVAILABLE = False

try:
    import pytesseract
    TESSERACT_AVAILABLE = True
except ImportError:
    print("pytesseract not available, using mock implementation")
    pytesseract = None
    TESSERACT_AVAILABLE = False

def preprocess_image(image_path: str) -> any:
    """
    Preprocess the image to improve OCR accuracy.
    """
    if not OPENCV_AVAILABLE:
        return None
    
    try:
        # Read the image
        image = cv2.imread(image_path)
        
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Apply threshold to get image with only black and white
        _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        
        # Noise removal
        kernel = np.ones((1, 1), np.uint8)
        opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=1)
        
        return opening
    except Exception as e:
        print(f"Error preprocessing image: {e}")
        return None

def extract_text_with_ocr(image_path: str) -> str:
    """
    Extract text from image using OCR.
    """
    if not TESSERACT_AVAILABLE:
        # Mock implementation for demonstration
        return "Mock OCR result: This is a sample text extracted from the image.\nPatient Name: John Doe\nDate: 2023-10-15\nDiagnosis: Routine Checkup\nPrescription: Vitamin D 1000 IU daily"
    
    try:
        # Preprocess the image
        processed_image = preprocess_image(image_path)
        
        # If preprocessing failed, try with original image
        if processed_image is None:
            text = pytesseract.image_to_string(image_path)
        else:
            # Use pytesseract to extract text
            text = pytesseract.image_to_string(processed_image)
        return text
    except Exception as e:
        return f"OCR Error: {str(e)}"

def extract_key_value_pairs(text: str) -> List[Dict[str, str]]:
    """
    Extract key-value pairs from the OCR text.
    This is a simplified implementation that looks for common patterns.
    """
    # Simple pattern matching for key-value pairs
    import re
    
    # Common patterns for key-value pairs
    patterns = [
        r'(\w+(?:\s+\w+)*?)\s*[:\-]\s*([^\n]+)',  # key: value or key - value
        r'(\w+(?:\s+\w+)*?)\s*\n\s*([^\n]+)',     # key\nvalue
    ]
    
    key_value_pairs = []
    
    for pattern in patterns:
        matches = re.findall(pattern, text)
        for key, value in matches:
            key = key.strip().rstrip(':').rstrip('-')
            value = value.strip()
            # Only add if both key and value are not empty and key is reasonably short
            if key and value and len(key) < 30:
                key_value_pairs.append({"key": key, "value": value})
    
    # Remove duplicates
    seen = set()
    unique_pairs = []
    for pair in key_value_pairs:
        key_lower = pair["key"].lower()
        if key_lower not in seen:
            seen.add(key_lower)
            unique_pairs.append(pair)
    
    return unique_pairs

def process_file(file_path: str) -> Dict:
    """
    Process a file and return OCR results.
    """
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            return {"error": "File not found"}
        
        # Extract text using OCR
        ocr_text = extract_text_with_ocr(file_path)
        
        # Extract key-value pairs
        key_value_pairs = extract_key_value_pairs(ocr_text)
        
        return {
            "success": True,
            "file_name": os.path.basename(file_path),
            "ocr_text": ocr_text,
            "key_value_pairs": key_value_pairs
        }
    except Exception as e:
        return {"error": f"Processing error: {str(e)}"}

def main():
    """
    Main function to process files from command line.
    """
    if len(sys.argv) < 2:
        print("Usage: python ocr_processor.py <file_path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    result = process_file(file_path)
    
    # Output result as JSON
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()