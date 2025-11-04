import { useEffect, useState } from "react";
import { Card, CardContent } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { FileText, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { ScrollArea } from "@/ui/scroll-area";

interface Report {
  id: string;
  file_name: string;
  upload_date: string;
  processed: boolean;
  extracted_data: any;
  summary: string | null;
  health_predictions: any;
  health_suggestions: string[] | null;
  risk_analysis: string | null;
}

interface ReportsListProps {
  userId: string;
}

const ReportsList = ({ userId }: ReportsListProps) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();

    // Listen for reports updates
    const handleReportsUpdate = () => {
      fetchReports();
    };

    window.addEventListener('reportsUpdated', handleReportsUpdate);

    return () => {
      window.removeEventListener('reportsUpdated', handleReportsUpdate);
    };
  }, [userId]);

  const fetchReports = async () => {
    try {
      // Get reports from localStorage
      const reportsData = JSON.parse(localStorage.getItem('lab_reports') || '[]');
      setReports(reportsData.slice(0, 10));
    } catch (error) {
      console.error('Error fetching reports:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-pulse text-muted-foreground">Loading reports...</div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>No reports uploaded yet</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-3">
        {reports.map((report) => (
          <Dialog key={report.id}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-[var(--shadow-glow)] transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{report.file_name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(report.upload_date), 'MMM dd, yyyy')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={report.processed ? 'default' : 'secondary'}
                      className="shrink-0"
                    >
                      {report.processed ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertCircle className="h-3 w-3 mr-1" />
                      )}
                      {report.processed ? 'Processed' : 'Pending'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>{report.file_name}</DialogTitle>
                <DialogDescription>
                  Uploaded on {format(new Date(report.upload_date), 'MMMM dd, yyyy')}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh]">
                <div className="space-y-4 pr-4">
                  {report.summary && (
                    <div>
                      <h3 className="font-semibold mb-2">Summary</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {report.summary}
                      </p>
                    </div>
                  )}
                  {report.risk_analysis && (
                    <div>
                      <h3 className="font-semibold mb-2 text-amber-600 dark:text-amber-400">Risk Analysis</h3>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {report.risk_analysis}
                      </p>
                    </div>
                  )}
                  {report.health_suggestions && report.health_suggestions.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2 text-green-600 dark:text-green-400">Health Suggestions</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {report.health_suggestions.map((suggestion, idx) => (
                          <li key={idx}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {report.extracted_data && (
                    <div>
                      <h3 className="font-semibold mb-2">Lab Data</h3>
                      <div className="bg-secondary/50 rounded-lg p-3 text-sm font-mono">
                        <pre className="whitespace-pre-wrap">
                          {JSON.stringify(report.extracted_data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                  {!report.processed && (
                    <div className="text-center py-4 text-muted-foreground">
                      <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                      <p>This report is still being processed...</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ReportsList;
