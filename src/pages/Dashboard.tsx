import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Activity, FileText, LogOut, Upload, Bot } from "lucide-react";
import FileUpload from "@/FileUpload";
import ReportsList from "@/ReportsList";
import ArogyaParthChat from "@/ArogyaParthChat";
import HealthCharts from "@/HealthCharts";
import DetailedAnalysis from "@/DetailedAnalysis";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/ThemeToggle";

const Dashboard = () => {
  const [loading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const userId = "demo-user"; // Mock user ID

  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "See you next time!",
    });
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Activity className="h-12 w-12 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 page-transition">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 animate-slide-down">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)] shrink-0 transition-smooth hover:scale-110">
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate">
                  AyuLink
                </h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">Health Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 transition-smooth hover:scale-105"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
        <div className="grid gap-3 sm:gap-6 grid-cols-3 stagger-children">
          <Card className="shadow-[var(--shadow-card)] hover-lift transition-smooth">
            <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-[10px] sm:text-sm font-medium text-muted-foreground">
                Total Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="flex items-center gap-1 sm:gap-2">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-lg sm:text-2xl font-bold">0</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)] hover-lift transition-smooth">
            <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-[10px] sm:text-sm font-medium text-muted-foreground">
                Processed
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="flex items-center gap-1 sm:gap-2">
                <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                <span className="text-lg sm:text-2xl font-bold">0</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)] hover-lift transition-smooth">
            <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-[10px] sm:text-sm font-medium text-muted-foreground">
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <div className="flex items-center gap-1 sm:gap-2">
                <Upload className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-lg sm:text-2xl font-bold">0</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <Card className="shadow-[var(--shadow-card)] hover-lift transition-smooth-slow">
            <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
              <CardTitle className="text-base sm:text-lg">Upload Lab Report</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Upload your lab reports for AI-powered analysis and predictions
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <FileUpload userId={userId} />
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-card)] hover-lift transition-smooth-slow">
            <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
              <CardTitle className="text-base sm:text-lg">Recent Reports</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your uploaded lab reports and health summaries
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <ReportsList userId={userId} />
            </CardContent>
          </Card>
        </div>

        <div className="animate-fade-in" style={{animationDelay: '0.3s'}}>
          <HealthCharts userId={userId} />
        </div>

        <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
          <DetailedAnalysis userId={userId} />
        </div>

        <div className="grid gap-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <ArogyaParthChat userId={userId} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
