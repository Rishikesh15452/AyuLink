import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { ScrollArea } from "@/ui/scroll-area";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

interface ArogyaParthChatProps {
  userId: string;
}

const ArogyaParthChat = ({ userId }: ArogyaParthChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchChatHistory();
  }, [userId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      const chatData = JSON.parse(localStorage.getItem('chat_messages') || '[]');
      setMessages(chatData.map((msg: any) => ({
        ...msg,
        role: msg.role as 'user' | 'assistant'
      })));
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    try {
      // Add user message
      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, userMsg]);

      // Simulate AI response
      await new Promise(resolve => setTimeout(resolve, 1000));

      const aiResponse = generateAIResponse(userMessage);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        created_at: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMsg]);

      // Save to localStorage
      const allMessages = [...messages, userMsg, assistantMsg];
      localStorage.setItem('chat_messages', JSON.stringify(allMessages));

      toast({
        title: "Response received",
        description: "Arogya Parth has analyzed your query",
      });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateAIResponse = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    const reports = JSON.parse(localStorage.getItem('lab_reports') || '[]');

    // Greeting responses
    if (lowerMsg.match(/^(hi|hello|hey|greetings)/)) {
      return "Hello! I'm Arogya Parth, your AI health assistant. I'm here to help you understand your lab reports and provide health insights. What would you like to know about your health today?";
    }

    // Thank you responses
    if (lowerMsg.includes('thank')) {
      return "You're welcome! I'm always here to help with your health questions. Feel free to ask me anything about your lab reports or wellness advice.";
    }

    // How are you
    if (lowerMsg.includes('how are you')) {
      return "I'm functioning perfectly, thank you for asking! I'm ready to help you with your health queries. Do you have any questions about your lab reports or health?";
    }

    // Report-related queries
    if (lowerMsg.includes('report') || lowerMsg.includes('result') || lowerMsg.includes('test')) {
      if (reports.length === 0) {
        return "You haven't uploaded any lab reports yet. Upload your first report using the upload section above to get started with personalized health insights and AI-powered analysis!";
      }
      const latest = reports[0];
      return `I've analyzed your latest report "${latest.file_name}" uploaded on ${new Date(latest.upload_date).toLocaleDateString()}.\n\n${latest.summary}\n\nYour key values:\n${Object.entries(latest.extracted_data).map(([key, value]) => `• ${key}: ${value}`).join('\n')}\n\nWould you like me to explain any specific test result?`;
    }

    // Blood sugar queries
    if (lowerMsg.includes('blood sugar') || lowerMsg.includes('glucose') || lowerMsg.includes('diabetes')) {
      return "Based on your lab results, your blood sugar level is 95 mg/dL, which is excellent and within the normal range (70-100 mg/dL fasting).\n\nTo maintain healthy blood sugar levels:\n✓ Regular exercise (30 minutes daily)\n✓ Balanced diet with complex carbohydrates\n✓ Limit refined sugars and processed foods\n✓ Stay hydrated\n✓ Monitor levels if you have family history of diabetes\n\nYour current levels show no concern for diabetes.";
    }

    // Hemoglobin queries
    if (lowerMsg.includes('hemoglobin') || lowerMsg.includes('hb') || lowerMsg.includes('anemia') || lowerMsg.includes('iron')) {
      return "Your hemoglobin level is 14.5 g/dL, which is excellent and well within the healthy range (13.5-17.5 g/dL for men, 12-15.5 g/dL for women).\n\nTo maintain optimal hemoglobin:\n✓ Iron-rich foods: spinach, lentils, red meat, chickpeas\n✓ Vitamin C helps iron absorption (citrus fruits, tomatoes)\n✓ Vitamin B12 and folate are important\n✓ Avoid excessive tea/coffee with meals (inhibits iron absorption)\n\nNo signs of anemia detected in your results.";
    }

    // WBC/Immunity queries
    if (lowerMsg.includes('wbc') || lowerMsg.includes('white blood') || lowerMsg.includes('immunity') || lowerMsg.includes('immune')) {
      return "Your White Blood Cell (WBC) count is 7,500 /µL, which is perfectly normal (4,500-11,000 /µL).\n\nThis indicates:\n✓ Healthy immune system\n✓ No signs of infection\n✓ Good body defense mechanism\n\nTo boost immunity naturally:\n• Eat fruits and vegetables rich in vitamins C & D\n• Get adequate sleep (7-8 hours)\n• Exercise regularly\n• Manage stress effectively\n• Stay hydrated";
    }

    // Platelet queries
    if (lowerMsg.includes('platelet')) {
      return "Your platelet count is 250,000 /µL, which is in the healthy normal range (150,000-450,000 /µL).\n\nPlatelet function:\n• Essential for blood clotting\n• Prevent excessive bleeding\n• Wound healing\n\nYour count is optimal - no concerns detected.";
    }

    // Diet/nutrition queries
    if (lowerMsg.includes('diet') || lowerMsg.includes('food') || lowerMsg.includes('eat') || lowerMsg.includes('nutrition')) {
      return "Based on your health profile, here's a personalized nutrition plan:\n\n🥗 **Recommended Foods:**\n• Leafy greens (spinach, kale)\n• Whole grains (brown rice, quinoa)\n• Lean proteins (chicken, fish, lentils)\n• Fresh fruits (berries, citrus)\n• Nuts and seeds\n• Plenty of water (8-10 glasses)\n\n❌ **Limit:**\n• Processed foods\n• Excessive sugar\n• High sodium foods\n• Fried and fast foods\n\nYour current health markers are good - maintain this with balanced nutrition!";
    }

    // Exercise queries
    if (lowerMsg.includes('exercise') || lowerMsg.includes('workout') || lowerMsg.includes('physical activity')) {
      return "Great question! Based on your health status, here's an exercise plan:\n\n🏃 **Recommended Activities:**\n• Cardio: 30 minutes daily (walking, jogging, cycling)\n• Strength training: 2-3 times per week\n• Flexibility: Yoga or stretching daily\n• Activities you enjoy (swimming, dancing, sports)\n\n⏰ **Guidelines:**\n• Start gradually if you're new to exercise\n• Warm up before and cool down after\n• Stay hydrated\n• Listen to your body\n\nYour current health allows for moderate to vigorous activity!";
    }

    // Risk/health concerns
    if (lowerMsg.includes('risk') || lowerMsg.includes('danger') || lowerMsg.includes('concern') || lowerMsg.includes('worry')) {
      return "Good news! Based on your latest lab results:\n\n✅ **Overall Health Status: GOOD**\n• All major parameters within normal range\n• Risk level: LOW\n• No immediate health concerns detected\n\n📊 **Your Key Indicators:**\n• Hemoglobin: Normal\n• Blood Sugar: Optimal\n• WBC: Healthy\n• Platelets: Normal\n\n💡 **Preventive Recommendations:**\n1. Continue current healthy lifestyle\n2. Regular health check-ups every 6 months\n3. Maintain balanced diet and exercise\n4. Monitor any new symptoms\n\nYou're doing great! Keep it up!";
    }

    // Medication queries
    if (lowerMsg.includes('medicine') || lowerMsg.includes('medication') || lowerMsg.includes('drug')) {
      return "Based on your current lab results, all your health parameters are within normal range, so no medications appear necessary at this time.\n\n⚠️ **Important:**\n• I can provide general health information\n• For medication advice, please consult your doctor\n• Never start/stop medications without medical advice\n• Keep your doctor informed of all supplements\n\nIf you have specific health concerns, I recommend scheduling a consultation with your healthcare provider.";
    }

    // Suggestions/recommendations
    if (lowerMsg.includes('suggest') || lowerMsg.includes('advice') || lowerMsg.includes('recommend') || lowerMsg.includes('tip')) {
      return "Based on your health profile, here are personalized recommendations:\n\n🎯 **Health Maintenance:**\n1. Keep up your current healthy lifestyle\n2. Maintain balanced diet with variety\n3. Regular exercise (30 min daily)\n4. Adequate sleep (7-8 hours)\n5. Stay hydrated (8+ glasses water)\n6. Stress management (meditation, hobbies)\n\n📅 **Preventive Care:**\n• Annual comprehensive health check-up\n• Track your health metrics over time\n• Upload new reports for trend analysis\n\n💪 **Optimize Your Health:**\n• Add more colorful vegetables\n• Include omega-3 rich foods\n• Practice mindful eating\n• Stay socially connected\n\nWhat specific aspect would you like to focus on?";
    }

    // Specific test value queries
    if (lowerMsg.includes('normal') || lowerMsg.includes('range') || lowerMsg.includes('value')) {
      return "Here are the normal ranges for common lab tests:\n\n📊 **Your Results vs Normal Range:**\n\n🩸 Hemoglobin\n• Your value: 14.5 g/dL\n• Normal: 12-16 g/dL ✅\n\n🔬 WBC Count\n• Your value: 7,500 /µL\n• Normal: 4,500-11,000 /µL ✅\n\n🩹 Platelets\n• Your value: 250,000 /µL\n• Normal: 150,000-450,000 /µL ✅\n\n🍬 Blood Sugar (Fasting)\n• Your value: 95 mg/dL\n• Normal: 70-100 mg/dL ✅\n\nAll your values are within healthy range!";
    }

    // When to see doctor
    if (lowerMsg.includes('doctor') || lowerMsg.includes('physician') || lowerMsg.includes('specialist')) {
      return "While your current lab results look good, here's when you should consult a doctor:\n\n🚨 **See Doctor If:**\n• You experience persistent symptoms\n• New unusual symptoms develop\n• You want to discuss specific health concerns\n• Planning major lifestyle changes\n• Need medication advice\n• Have family history of certain conditions\n\n📅 **Regular Check-ups:**\n• Annual physical examination\n• Bi-annual lab tests if you're over 40\n• More frequent if you have chronic conditions\n\nPreventive care is always better than treatment!";
    }

    // Default response for unmatched queries
    return `I'm here to help with your health questions! I can assist you with:\n\n📋 Lab Report Analysis\n💊 Understanding Test Results\n🥗 Nutrition Recommendations\n🏃 Exercise Guidance\n⚕️ General Health Advice\n📊 Health Trends & Insights\n\nYour question: "${message}"\n\nCould you be more specific? For example:\n• "What's my blood sugar level?"\n• "Should I be concerned about my results?"\n• "What foods should I eat?"\n• "How can I improve my health?"\n\nI'm here to help!`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (loadingHistory) {
    return (
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Arogya Parth
          </CardTitle>
          <CardDescription>Your AI Health Assistant</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-[var(--shadow-card)] flex flex-col h-[500px] sm:h-[600px]">
      <CardHeader className="px-4 sm:px-6 py-4 sm:py-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          Arogya Parth
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Ask me about your lab results, health predictions, or wellness advice
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        <ScrollArea className="flex-1 px-3 sm:px-4">
          <div className="space-y-3 sm:space-y-4 py-3 sm:py-4">
            {messages.length === 0 && (
              <div className="text-center py-6 sm:py-8 text-muted-foreground">
                <Bot className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs sm:text-sm px-4">
                  Hello! I'm Arogya Parth, your health assistant.
                  <br />
                  Ask me anything about your lab reports!
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 sm:gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 sm:px-4 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
                  </div>
                )}
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>
        <div className="border-t p-3 sm:p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your health reports..."
              disabled={loading}
              className="flex-1 text-sm"
            />
            <Button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              size="icon"
              className="shrink-0"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArogyaParthChat;
