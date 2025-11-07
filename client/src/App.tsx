import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { LiveTicker } from "@/components/LiveTicker";
import { FloatingChatAssistant } from "@/components/FloatingChatAssistant";
import Home from "@/pages/Home";
import SavedSearches from "@/pages/SavedSearches";
import GetPreapproved from "@/pages/GetPreapproved";
import GetHomeValue from "@/pages/GetHomeValue";
import BrokerRegistration from "@/pages/BrokerRegistration";
import LiveDealMap from "@/pages/LiveDealMap";
import DocumentPortal from "@/pages/DocumentPortal";
import Coaching from "@/pages/Coaching";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/saved" component={SavedSearches} />
      <Route path="/services/get-preapproved" component={GetPreapproved} />
      <Route path="/services/get-home-value" component={GetHomeValue} />
      <Route path="/broker-registration" component={BrokerRegistration} />
      <Route path="/live-deal-map" component={LiveDealMap} />
      <Route path="/document-portal" component={DocumentPortal} />
      <Route path="/coaching" component={Coaching} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <Router />
            <FloatingChatAssistant />
            <LiveTicker />
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
