import { useState } from "react";
import { Button } from "@/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Loader2, X } from "lucide-react";
import { Progress } from "@/ui/progress";

interface FileUploadProps {
  userId: string;
}

const FileUpload = ({ userId }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file (JPG, PNG)",
          variant: "destructive",
        });
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !userId) return;

    setUploading(true);
    setProgress(20);

    try {
      // Simulate file processing
      setProgress(40);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Read file as base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64File = reader.result as string;
        
        setProgress(60);
        
        // Create mock report data with detailed analysis
        const report = {
          id: Date.now().toString(),
          file_name: file.name,
          upload_date: new Date().toISOString(),
          processed: true,
          file_data: base64File,
          file_size: file.size,
          extracted_data: {
            "Hemoglobin": "14.5 g/dL",
            "RBC Count": "5.2 million/µL",
            "WBC Count": "7,500 /µL",
            "Platelet Count": "250,000 /µL",
            "Blood Sugar (Fasting)": "95 mg/dL",
            "HbA1c": "5.4%",
            "Cholesterol (Total)": "180 mg/dL",
            "HDL Cholesterol": "55 mg/dL",
            "LDL Cholesterol": "110 mg/dL",
            "Triglycerides": "120 mg/dL",
          },
          detailed_analysis: {
            diabetes_risk: {
              status: "Low Risk",
              level: "healthy",
              blood_sugar: 95,
              hba1c: 5.4,
              analysis: "Your fasting blood sugar of 95 mg/dL and HbA1c of 5.4% are both within normal range. This indicates excellent glucose control with no signs of diabetes or pre-diabetes.",
              recommendations: [
                "Maintain current healthy eating habits",
                "Continue regular physical activity",
                "Monitor blood sugar annually",
                "Limit refined carbohydrates and sugars",
              ],
              risk_factors: [],
            },
            hemoglobin: {
              status: "Normal",
              level: "optimal",
              value: 14.5,
              analysis: "Your hemoglobin level of 14.5 g/dL is excellent and within the healthy range. This indicates good oxygen-carrying capacity of your blood with no signs of anemia.",
              recommendations: [
                "Continue iron-rich diet (spinach, lentils, lean meat)",
                "Pair iron sources with vitamin C for better absorption",
                "Stay well-hydrated",
                "Regular blood donations are safe at this level",
              ],
              concerns: [],
            },
            rbc: {
              status: "Normal",
              level: "healthy",
              value: 5.2,
              analysis: "Red Blood Cell count of 5.2 million/µL is within normal range. Your RBCs are efficiently transporting oxygen throughout your body.",
              recommendations: [
                "Maintain adequate hydration",
                "Ensure sufficient rest and sleep",
                "Continue balanced nutrition",
                "Regular cardiovascular exercise",
              ],
              concerns: [],
            },
            wbc_immunity: {
              status: "Normal",
              level: "strong",
              value: 7500,
              analysis: "White Blood Cell count of 7,500/µL indicates a healthy immune system. No signs of infection or immune disorders detected.",
              recommendations: [
                "Boost immunity with vitamin C and D rich foods",
                "Get 7-8 hours of quality sleep",
                "Manage stress through meditation or yoga",
                "Regular exercise to maintain immune function",
              ],
              concerns: [],
            },
            platelets: {
              status: "Normal",
              level: "optimal",
              value: 250000,
              analysis: "Platelet count of 250,000/µL is perfectly normal. Your blood clotting function is healthy with no bleeding or clotting risks.",
              recommendations: [
                "Maintain current health habits",
                "Stay hydrated",
                "Avoid excessive alcohol consumption",
                "Report any unusual bruising to your doctor",
              ],
              concerns: [],
            },
            cholesterol: {
              status: "Normal",
              level: "healthy",
              total: 180,
              hdl: 55,
              ldl: 110,
              triglycerides: 120,
              analysis: "Your cholesterol profile is excellent. Total cholesterol of 180 mg/dL is well below 200 mg/dL (desirable). HDL (good cholesterol) at 55 mg/dL is protective. LDL at 110 mg/dL is optimal. Triglycerides at 120 mg/dL are normal.",
              recommendations: [
                "Include omega-3 fatty acids (fish, walnuts, flaxseeds)",
                "Limit saturated fats and trans fats",
                "Increase fiber intake (oats, beans, fruits)",
                "Regular aerobic exercise to boost HDL",
              ],
              concerns: [],
            },
          },
          summary: `Lab Report Analysis for ${file.name}

Your recent lab results show excellent overall health markers. All parameters are within healthy ranges indicating good metabolic health, strong immunity, and low disease risk.

Key Highlights:
• No signs of diabetes or pre-diabetes
• Hemoglobin and RBC counts are optimal
• Healthy immune function
• Normal blood clotting ability
• Excellent cholesterol profile

Continue your current healthy lifestyle to maintain these positive results.`,
          health_predictions: {
            overall_health: "Excellent",
            risk_level: "Low",
          },
          health_suggestions: [
            "Maintain current healthy lifestyle habits",
            "Continue balanced diet with adequate iron and nutrients",
            "Stay hydrated and exercise regularly (30 min daily)",
            "Schedule regular check-ups every 6 months",
            "Monitor blood sugar levels annually",
            "Keep stress levels manageable",
          ],
          risk_analysis: "Overall health indicators are excellent. No immediate concerns detected. All major parameters including blood sugar, hemoglobin, cholesterol, and immunity markers are within optimal ranges. Continue monitoring and maintain current wellness routine.",
        };

        // Get existing reports from localStorage
        const existingReports = JSON.parse(localStorage.getItem('lab_reports') || '[]');
        existingReports.unshift(report);
        localStorage.setItem('lab_reports', JSON.stringify(existingReports));

        setProgress(80);
        await new Promise(resolve => setTimeout(resolve, 500));

        toast({
          title: "Upload successful!",
          description: "Your lab report has been analyzed successfully.",
        });

        setProgress(100);
        setFile(null);

        // Trigger a custom event to notify other components
        window.dispatchEvent(new Event('reportsUpdated'));

        setTimeout(() => {
          setProgress(0);
        }, 1000);
      };
      
      reader.readAsDataURL(file);

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          id="file-upload"
          disabled={uploading || processing}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            {file ? (
              <>
                <FileText className="h-12 w-12 text-primary" />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{file.name}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setFile(null);
                    }}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Click to upload lab report</p>
                  <p className="text-xs text-muted-foreground">
                    PDF or Image (JPG, PNG) up to 10MB
                  </p>
                </div>
              </>
            )}
          </div>
        </label>
      </div>

      {progress > 0 && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">
            {uploading ? 'Uploading...' : processing ? 'Processing...' : 'Complete!'}
          </p>
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={!file || uploading || processing}
        className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
      >
        {uploading || processing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {uploading ? 'Uploading...' : 'Processing...'}
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload & Analyze
          </>
        )}
      </Button>
    </div>
  );
};

export default FileUpload;
