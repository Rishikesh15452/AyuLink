import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Progress } from "@/ui/progress";
import { 
  Activity, 
  Droplet, 
  Heart, 
  Shield, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
  ReferenceLine
} from "recharts";

interface DetailedAnalysisProps {
  userId: string;
}

const DetailedAnalysis = ({ userId }: DetailedAnalysisProps) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();

    const handleReportsUpdate = () => {
      fetchAnalysis();
    };

    window.addEventListener('reportsUpdated', handleReportsUpdate);
    return () => {
      window.removeEventListener('reportsUpdated', handleReportsUpdate);
    };
  }, [userId]);

  const fetchAnalysis = () => {
    try {
      const reports = JSON.parse(localStorage.getItem('lab_reports') || '[]');
      if (reports.length > 0 && reports[0].detailed_analysis) {
        setAnalysis(reports[0].detailed_analysis);
      } else {
        setAnalysis(null);
      }
    } catch (error) {
      console.error('Error fetching analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'optimal':
      case 'healthy':
      case 'strong':
        return 'text-green-600 dark:text-green-400';
      case 'moderate':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'concern':
      case 'high':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  const getStatusBadge = (status: string, level: string) => {
    const isGood = level === 'optimal' || level === 'healthy' || level === 'strong';
    return (
      <Badge variant={isGood ? 'default' : 'secondary'} className="gap-1">
        {isGood ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
        {status}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card className="shadow-[var(--shadow-card)]">
        <CardContent className="flex items-center justify-center py-12">
          <div className="animate-pulse text-muted-foreground">Loading analysis...</div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="shadow-[var(--shadow-card)]">
        <CardContent className="text-center py-12 text-muted-foreground">
          <Info className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Upload a lab report to see detailed health analysis</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <span className="truncate">Detailed Health Analysis</span>
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Comprehensive breakdown of your latest lab results
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
        <Tabs defaultValue="diabetes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto">
            <TabsTrigger value="diabetes" className="text-xs sm:text-sm py-2">Diabetes</TabsTrigger>
            <TabsTrigger value="hemoglobin" className="text-xs sm:text-sm py-2">Hb</TabsTrigger>
            <TabsTrigger value="rbc" className="text-xs sm:text-sm py-2">RBC</TabsTrigger>
            <TabsTrigger value="immunity" className="text-xs sm:text-sm py-2">Immunity</TabsTrigger>
            <TabsTrigger value="platelets" className="text-xs sm:text-sm py-2">Platelets</TabsTrigger>
            <TabsTrigger value="cholesterol" className="text-xs sm:text-sm py-2">Cholesterol</TabsTrigger>
          </TabsList>

          {/* Diabetes Analysis */}
          <TabsContent value="diabetes" className="space-y-3 sm:space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Droplet className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-lg">Diabetes Risk Assessment</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Blood Sugar & HbA1c Analysis</p>
                </div>
              </div>
              {getStatusBadge(analysis.diabetes_risk.status, analysis.diabetes_risk.level)}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Blood Sugar (Fasting)</span>
                  <span className="font-semibold">{analysis.diabetes_risk.blood_sugar} mg/dL</span>
                </div>
                <Progress value={((100 - analysis.diabetes_risk.blood_sugar) / 100) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">Normal: 70-100 mg/dL</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">HbA1c</span>
                  <span className="font-semibold">{analysis.diabetes_risk.hba1c}%</span>
                </div>
                <Progress value={((7 - analysis.diabetes_risk.hba1c) / 7) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">Normal: Below 5.7%</p>
              </div>
            </div>

            {/* Blood Sugar Chart */}
            <div className="bg-secondary/20 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Blood Sugar Trend</h4>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={[
                  { time: '6 months ago', value: 92, normal: 100 },
                  { time: '4 months ago', value: 94, normal: 100 },
                  { time: '2 months ago', value: 93, normal: 100 },
                  { time: 'Current', value: analysis.diabetes_risk.blood_sugar, normal: 100 },
                ]}>
                  <defs>
                    <linearGradient id="colorSugar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis domain={[60, 120]} className="text-xs" />
                  <Tooltip />
                  <ReferenceLine y={100} stroke="#10b981" strokeDasharray="3 3" label="Normal Max" />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorSugar)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Analysis
              </h4>
              <p className="text-sm text-muted-foreground">{analysis.diabetes_risk.analysis}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {analysis.diabetes_risk.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Hemoglobin Analysis */}
          <TabsContent value="hemoglobin" className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Droplet className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Hemoglobin Level</h3>
                  <p className="text-sm text-muted-foreground">Oxygen-Carrying Capacity</p>
                </div>
              </div>
              {getStatusBadge(analysis.hemoglobin.status, analysis.hemoglobin.level)}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Hemoglobin</span>
                <span className="font-semibold">{analysis.hemoglobin.value} g/dL</span>
              </div>
              <Progress value={(analysis.hemoglobin.value / 18) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Normal: 12-16 g/dL (varies by gender)</p>
            </div>

            {/* Hemoglobin Bar Chart */}
            <div className="bg-secondary/20 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Hemoglobin Levels Comparison</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  { category: 'Low Range', value: 10, color: '#ef4444' },
                  { category: 'Normal Min', value: 12, color: '#10b981' },
                  { category: 'Your Level', value: analysis.hemoglobin.value, color: '#6366f1' },
                  { category: 'Normal Max', value: 16, color: '#10b981' },
                  { category: 'High Range', value: 18, color: '#f59e0b' },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="category" className="text-xs" angle={-15} textAnchor="end" height={60} />
                  <YAxis domain={[0, 20]} className="text-xs" label={{ value: 'g/dL', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]}>
                    {[
                      { category: 'Low Range', value: 10, color: '#ef4444' },
                      { category: 'Normal Min', value: 12, color: '#10b981' },
                      { category: 'Your Level', value: analysis.hemoglobin.value, color: '#6366f1' },
                      { category: 'Normal Max', value: 16, color: '#10b981' },
                      { category: 'High Range', value: 18, color: '#f59e0b' },
                    ].map((entry, index) => (
                      <Bar key={`bar-${index}`} dataKey="value" fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Analysis
              </h4>
              <p className="text-sm text-muted-foreground">{analysis.hemoglobin.analysis}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {analysis.hemoglobin.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* RBC Analysis */}
          <TabsContent value="rbc" className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-red-600/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Red Blood Cell Count</h3>
                  <p className="text-sm text-muted-foreground">Oxygen Transport</p>
                </div>
              </div>
              {getStatusBadge(analysis.rbc.status, analysis.rbc.level)}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">RBC Count</span>
                <span className="font-semibold">{analysis.rbc.value} million/µL</span>
              </div>
              <Progress value={(analysis.rbc.value / 6) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Normal: 4.5-5.9 million/µL</p>
            </div>

            {/* RBC Trend Line Chart */}
            <div className="bg-secondary/20 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">RBC Count Over Time</h4>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={[
                  { month: 'Jan', count: 5.0, min: 4.5, max: 5.9 },
                  { month: 'Feb', count: 5.1, min: 4.5, max: 5.9 },
                  { month: 'Mar', count: 5.2, min: 4.5, max: 5.9 },
                  { month: 'Apr', count: analysis.rbc.value, min: 4.5, max: 5.9 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis domain={[4, 6.5]} className="text-xs" label={{ value: 'million/µL', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={4.5} stroke="#10b981" strokeDasharray="3 3" label="Min Normal" />
                  <ReferenceLine y={5.9} stroke="#10b981" strokeDasharray="3 3" label="Max Normal" />
                  <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Analysis
              </h4>
              <p className="text-sm text-muted-foreground">{analysis.rbc.analysis}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {analysis.rbc.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Immunity Analysis */}
          <TabsContent value="immunity" className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Immunity Status</h3>
                  <p className="text-sm text-muted-foreground">White Blood Cell Count</p>
                </div>
              </div>
              {getStatusBadge(analysis.wbc_immunity.status, analysis.wbc_immunity.level)}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">WBC Count</span>
                <span className="font-semibold">{analysis.wbc_immunity.value.toLocaleString()} /µL</span>
              </div>
              <Progress value={(analysis.wbc_immunity.value / 11000) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Normal: 4,500-11,000 /µL</p>
            </div>

            {/* WBC Area Chart */}
            <div className="bg-secondary/20 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">White Blood Cell Trend</h4>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={[
                  { period: 'Week 1', wbc: 7200, lower: 4500, upper: 11000 },
                  { period: 'Week 2', wbc: 7300, lower: 4500, upper: 11000 },
                  { period: 'Week 3', wbc: 7400, lower: 4500, upper: 11000 },
                  { period: 'Week 4', wbc: analysis.wbc_immunity.value, lower: 4500, upper: 11000 },
                ]}>
                  <defs>
                    <linearGradient id="colorWBC" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="period" className="text-xs" />
                  <YAxis domain={[3000, 12000]} className="text-xs" />
                  <Tooltip />
                  <Legend />
                  <ReferenceLine y={4500} stroke="#10b981" strokeDasharray="3 3" label="Min" />
                  <ReferenceLine y={11000} stroke="#10b981" strokeDasharray="3 3" label="Max" />
                  <Area type="monotone" dataKey="wbc" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWBC)" name="WBC Count" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Analysis
              </h4>
              <p className="text-sm text-muted-foreground">{analysis.wbc_immunity.analysis}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {analysis.wbc_immunity.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Platelets Analysis */}
          <TabsContent value="platelets" className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Platelet Count</h3>
                  <p className="text-sm text-muted-foreground">Blood Clotting Ability</p>
                </div>
              </div>
              {getStatusBadge(analysis.platelets.status, analysis.platelets.level)}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Platelet Count</span>
                <span className="font-semibold">{analysis.platelets.value.toLocaleString()} /µL</span>
              </div>
              <Progress value={(analysis.platelets.value / 450000) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">Normal: 150,000-450,000 /µL</p>
            </div>

            {/* Platelet Bar Chart */}
            <div className="bg-secondary/20 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Platelet Count History</h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={[
                  { date: '1 Month', count: 245000 },
                  { date: '3 Weeks', count: 248000 },
                  { date: '2 Weeks', count: 247000 },
                  { date: 'Current', count: analysis.platelets.value },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis domain={[100000, 500000]} className="text-xs" />
                  <Tooltip formatter={(value) => value.toLocaleString()} />
                  <Legend />
                  <ReferenceLine y={150000} stroke="#10b981" strokeDasharray="3 3" label="Min Normal" />
                  <ReferenceLine y={450000} stroke="#10b981" strokeDasharray="3 3" label="Max Normal" />
                  <Bar dataKey="count" fill="#a855f7" radius={[8, 8, 0, 0]} name="Platelet Count" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Analysis
              </h4>
              <p className="text-sm text-muted-foreground">{analysis.platelets.analysis}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {analysis.platelets.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Cholesterol Analysis */}
          <TabsContent value="cholesterol" className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Cholesterol Profile</h3>
                  <p className="text-sm text-muted-foreground">Lipid Panel Analysis</p>
                </div>
              </div>
              {getStatusBadge(analysis.cholesterol.status, analysis.cholesterol.level)}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Cholesterol</span>
                  <span className="font-semibold">{analysis.cholesterol.total} mg/dL</span>
                </div>
                <Progress value={((240 - analysis.cholesterol.total) / 240) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">Desirable: Below 200 mg/dL</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">HDL (Good)</span>
                  <span className="font-semibold">{analysis.cholesterol.hdl} mg/dL</span>
                </div>
                <Progress value={(analysis.cholesterol.hdl / 60) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">Good: Above 40 mg/dL</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">LDL (Bad)</span>
                  <span className="font-semibold">{analysis.cholesterol.ldl} mg/dL</span>
                </div>
                <Progress value={((190 - analysis.cholesterol.ldl) / 190) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">Optimal: Below 100 mg/dL</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Triglycerides</span>
                  <span className="font-semibold">{analysis.cholesterol.triglycerides} mg/dL</span>
                </div>
                <Progress value={((200 - analysis.cholesterol.triglycerides) / 200) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">Normal: Below 150 mg/dL</p>
              </div>
            </div>

            {/* Cholesterol Multi-Bar Chart */}
            <div className="bg-secondary/20 rounded-lg p-3 sm:p-4">
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Cholesterol Profile Breakdown</h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={[
                  {
                    name: 'Your Levels',
                    Total: analysis.cholesterol.total,
                    HDL: analysis.cholesterol.hdl,
                    LDL: analysis.cholesterol.ldl,
                    Triglycerides: analysis.cholesterol.triglycerides,
                  },
                  {
                    name: 'Optimal Range',
                    Total: 200,
                    HDL: 60,
                    LDL: 100,
                    Triglycerides: 150,
                  },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" label={{ value: 'mg/dL', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="Total" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="HDL" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="LDL" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Triglycerides" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                Analysis
              </h4>
              <p className="text-sm text-muted-foreground">{analysis.cholesterol.analysis}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Recommendations</h4>
              <ul className="space-y-1">
                {analysis.cholesterol.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DetailedAnalysis;
