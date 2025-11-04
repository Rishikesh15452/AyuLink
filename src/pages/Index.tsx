import { Button } from "@/ui/button";
import { Card, CardContent } from "@/ui/card";
import { Activity, FileText, Brain, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/ThemeToggle";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
  <header className="relative border-b border-border bg-card/50 backdrop-blur-sm animate-fade-in">
          <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)]">
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                </div>
                <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AyuLink
                </h1>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <ThemeToggle />
                <Button
                  onClick={() => navigate("/auth")}
                  variant="outline"
                  size="sm"
                  className="gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <span className="sm:hidden">Login</span>
                  <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="relative">
          <section className="container mx-auto px-4 py-12 sm:py-20 md:py-32 text-center animate-slide-up">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              <div className="inline-block">
                <div className="h-16 w-16 sm:h-20 sm:w-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)] mb-4 sm:mb-6 animate-float">
                  <Activity className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
                </div>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight px-4">
                Your Health,
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Intelligently Tracked
                </span>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                Upload your lab reports and let AI analyze them instantly. Get insights,
                track trends, and take control of your health journey with AyuLink.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 gap-2 w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12 sm:py-20">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
              <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-shadow animate-fade-in">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <FileText className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Smart OCR</h3>
                  <p className="text-muted-foreground">
                    Advanced OCR technology extracts key values from your lab reports
                    automatically
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-shadow animate-fade-in">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Brain className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Get intelligent summaries and insights powered by advanced AI models
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-shadow animate-fade-in">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="h-14 w-14 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your health data is encrypted and stored securely with enterprise-grade
                    protection
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
            <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold px-4">
                Ready to take control of your health?
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground px-4">
                Join AyuLink today and experience the future of health tracking
              </p>
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-base sm:text-lg px-6 sm:px-8 gap-2 w-full sm:w-auto mx-4"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
