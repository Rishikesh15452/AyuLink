import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { Activity, AlertTriangle, TrendingUp } from "lucide-react";

interface HealthChartsProps {
  userId: string;
}

const COLORS = ['#10b981', '#fbbf24', '#ef4444'];
const RISK_COLORS = {
  low: '#10b981',
  medium: '#fbbf24',
  high: '#ef4444',
};

const HealthCharts = ({ userId }: HealthChartsProps) => {
  const [riskData, setRiskData] = useState<any[]>([]);
  const [trendsData, setTrendsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthData();

    // Listen for reports updates
    const handleReportsUpdate = () => {
      fetchHealthData();
    };

    window.addEventListener('reportsUpdated', handleReportsUpdate);

    return () => {
      window.removeEventListener('reportsUpdated', handleReportsUpdate);
    };
  }, [userId]);

  const fetchHealthData = async () => {
    try {
      const reportsData = JSON.parse(localStorage.getItem('lab_reports') || '[]');
      const reports = reportsData.filter((r: any) => r.processed);

      if (reports && reports.length > 0) {
        // Process risk data for pie chart
        const latestReport = reports[reports.length - 1];
        if (latestReport.health_predictions && typeof latestReport.health_predictions === 'object') {
          const predictions = latestReport.health_predictions as any;
          if (predictions.disease_probability) {
            const riskArray = Object.entries(predictions.disease_probability).map(
              ([name, level]) => ({
                name: name.charAt(0).toUpperCase() + name.slice(1).replace('_', ' '),
                value: level === 'high' ? 3 : level === 'medium' ? 2 : 1,
                level: level as string,
                fill: RISK_COLORS[level as keyof typeof RISK_COLORS],
              })
            );
            setRiskData(riskArray);
          }
        }

        // Process trends data for line chart
        const trends = reports.map((report: any, index: number) => {
          const predictions = report.health_predictions as any;
          return {
            date: new Date(report.upload_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            reportNumber: index + 1,
            processed: report.processed ? 1 : 0,
            hasRisks: (predictions?.risk_factors && Array.isArray(predictions.risk_factors) && predictions.risk_factors.length > 0) ? 1 : 0,
          };
        });
        setTrendsData(trends);
      }
    } catch (error) {
      console.error('Error fetching health data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="shadow-[var(--shadow-card)]">
            <CardContent className="flex items-center justify-center py-12">
              <div className="animate-pulse text-muted-foreground">Loading charts...</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (riskData.length === 0 && trendsData.length === 0) {
    return (
      <Card className="shadow-[var(--shadow-card)]">
        <CardContent className="text-center py-12 text-muted-foreground">
          <Activity className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Upload lab reports to see health analytics</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {riskData.length > 0 && (
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Disease Risk Analysis
            </CardTitle>
            <CardDescription>
              Predicted health risk levels based on your latest lab report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, level }) => `${name}: ${level}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {trendsData.length > 0 && (
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Report Trends
            </CardTitle>
            <CardDescription>
              Your health report upload history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reportNumber" fill="#6366f1" name="Report Number" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthCharts;
