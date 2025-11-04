import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Activity, Loader2 } from "lucide-react";
import { ThemeToggle } from "@/ThemeToggle";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup without database
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Account created successfully. Welcome to AyuLink!",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 500);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signin without database
    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "Signed in successfully.",
      });
      navigate("/dashboard");
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-background via-secondary/30 to-primary/10 page-transition">
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 animate-fade-in">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-md shadow-[var(--shadow-glow)] animate-scale-in">
        <CardHeader className="text-center space-y-2 px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex justify-center mb-3 sm:mb-4 animate-slide-down">
            <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)] transition-smooth hover:scale-110 animate-float">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-slide-up">
            AyuLink
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm animate-slide-up" style={{animationDelay: '0.1s'}}>Your personal health tracking companion</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <TabsTrigger value="signin" className="transition-smooth">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="transition-smooth">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="animate-fade-in">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2 animate-slide-from-left" style={{animationDelay: '0.1s'}}>
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-smooth focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2 animate-slide-from-left" style={{animationDelay: '0.2s'}}>
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="transition-smooth focus:scale-[1.02]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-smooth hover:scale-[1.02] animate-slide-up"
                  style={{animationDelay: '0.3s'}}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="animate-fade-in">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2 animate-slide-from-left" style={{animationDelay: '0.1s'}}>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="transition-smooth focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2 animate-slide-from-left" style={{animationDelay: '0.2s'}}>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-smooth focus:scale-[1.02]"
                  />
                </div>
                <div className="space-y-2 animate-slide-from-left" style={{animationDelay: '0.3s'}}>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="transition-smooth focus:scale-[1.02]"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-smooth hover:scale-[1.02] animate-slide-up"
                  style={{animationDelay: '0.4s'}}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
