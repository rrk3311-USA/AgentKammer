import { Suspense, lazy, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const FloatingChatAssistant = lazy(() => import("@/components/FloatingChatAssistant").then((module) => ({ default: module.FloatingChatAssistant })));

const Home = lazy(() => import("@/pages/Home"));
const Buildings = lazy(() => import("@/pages/Buildings"));
const BuySell = lazy(() => import("@/pages/BuySell"));
const RealEstate = lazy(() => import("@/pages/RealEstate"));
const Strategy = lazy(() => import("@/pages/Strategy"));
const Contact = lazy(() => import("@/pages/Contact"));
const NewYorkMarket = lazy(() => import("@/pages/NewYorkMarket"));
const Profile = lazy(() => import("@/pages/Profile"));
const ReverseBuyerOrigination = lazy(() => import("@/pages/ReverseBuyerOrigination"));
const ReverseSellerOrigination = lazy(() => import("@/pages/ReverseSellerOrigination"));
const NotFound = lazy(() => import("@/pages/not-found"));

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Use setTimeout to ensure it happens after render and DOM updates
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
    }, 0);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/buildings" component={Buildings} />
      <Route path="/buy-sell" component={BuySell} />
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/strategy" component={Strategy} />
      <Route path="/profile" component={Profile} />
      <Route path="/contact" component={Contact} />
      <Route path="/new-york-market" component={NewYorkMarket} />
      <Route path="/reverse-buyer-origination" component={ReverseBuyerOrigination} />
      <Route path="/reverse-seller-architecture" component={ReverseSellerOrigination} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-brand-ivory text-brand-graphite">
            <ScrollToTop />
            <Header />
            <Suspense fallback={<div className="mx-auto w-full max-w-7xl px-6 py-12 text-white/70">Loading...</div>}>
              <Router />
            </Suspense>
            <Footer />
            <Suspense fallback={null}>
              <FloatingChatAssistant />
            </Suspense>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
