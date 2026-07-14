import { Suspense, lazy, useEffect, useRef } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DecisionAssistantDock } from "@/components/DecisionAssistantDock";
import { initVisitorSignalTracking, trackPageViewSignal } from "@/lib/visitor-signals";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Buildings = lazy(() => import("@/pages/Buildings"));
const BuildingReport = lazy(() => import("@/pages/BuildingReport"));
const NewYorkMarket = lazy(() => import("@/pages/NewYorkMarket"));
const Intelligence = lazy(() => import("@/pages/Intelligence"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceLanding = lazy(() => import("@/pages/ServiceLanding"));
const Buy = lazy(() => import("@/pages/Buy"));
const Perspectives = lazy(() => import("@/pages/Perspectives"));
const Contact = lazy(() => import("@/pages/Contact"));
const AdminPortal = lazy(() => import("@/pages/AdminPortal"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Redirect({ to }: { to: string }) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation(to);
  }, [setLocation, to]);

  return null;
}

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
    }, 0);
  }, [location]);
  
  return null;
}

function VisitorSignals() {
  const [location] = useLocation();
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (location.startsWith("/admin")) return;
    if (!bootstrapped.current) {
      bootstrapped.current = true;
      initVisitorSignalTracking(location);
      return;
    }
    trackPageViewSignal(location);
  }, [location]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/admin" component={AdminPortal} />
      <Route path="/admin/*" component={AdminPortal} />
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/:slug">{({ slug }) => <ServiceLanding slug={slug} />}</Route>
      <Route path="/building-reports" component={Buildings} />
      <Route path="/building-reports/individual-buildings" component={BuildingReport} />
      <Route path="/building-reports/neighborhood-guides" component={NewYorkMarket} />
      <Route path="/building-reports/market-briefs" component={Intelligence} />
      <Route path="/buyer-advisory" component={Buy} />
      <Route path="/insights" component={Perspectives} />
      <Route path="/contact" component={Contact} />
      <Route path="/buildings">{() => <Redirect to="/building-reports" />}</Route>
      <Route path="/buildings/:slug/report">{() => <Redirect to="/building-reports/individual-buildings" />}</Route>
      <Route path="/buy">{() => <Redirect to="/buyer-advisory" />}</Route>
      <Route path="/executive-relocation">{() => <Redirect to="/services/executive-relocation-nyc" />}</Route>
      <Route path="/corporate-relocation">{() => <Redirect to="/services/corporate-relocation-buyers-nyc" />}</Route>
      <Route path="/international">{() => <Redirect to="/services/foreign-buyers-new-york" />}</Route>
      <Route path="/senior-downsizing">{() => <Redirect to="/services/retiree-senior-home-buyers-nyc" />}</Route>
      <Route path="/school-district-planning">{() => <Redirect to="/services/school-district-planning-nyc" />}</Route>
      <Route path="/military-relocation">{() => <Redirect to="/services/military-relocation-nyc" />}</Route>
      <Route path="/physician-relocation">{() => <Redirect to="/services/physician-relocation-nyc" />}</Route>
      <Route path="/finance-relocation">{() => <Redirect to="/services/finance-hedge-fund-relocation-nyc" />}</Route>
      <Route path="/pet-friendly-moves">{() => <Redirect to="/services/pet-friendly-moves-nyc" />}</Route>
      <Route path="/new-york-market">{() => <Redirect to="/building-reports/neighborhood-guides" />}</Route>
      <Route path="/intelligence">{() => <Redirect to="/building-reports/market-briefs" />}</Route>
      <Route path="/perspectives">{() => <Redirect to="/insights" />}</Route>
      <Route path="/lease">{() => <Redirect to="/contact" />}</Route>
      <Route path="/sell">{() => <Redirect to="/contact" />}</Route>
      <Route path="/strategy">{() => <Redirect to="/buyer-advisory" />}</Route>
      <Route path="/buy-sell">{() => <Redirect to="/buyer-advisory" />}</Route>
      <Route path="/profile">{() => <Redirect to="/about" />}</Route>
      <Route path="/reverse-buyer-origination">{() => <Redirect to="/buyer-advisory" />}</Route>
      <Route path="/reverse-seller-architecture">{() => <Redirect to="/contact" />}</Route>
      <Route path="/real-estate">{() => <Redirect to="/building-reports" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-[#14181f] px-6 py-12 text-white/50">Loading admin…</div>}>
          <Router />
        </Suspense>
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-brand-charcoal text-brand-ink">
      <ScrollToTop />
      <VisitorSignals />
      <Header />
      <Suspense fallback={<div className="mx-auto w-full max-w-7xl px-6 py-12 text-white/70">Loading...</div>}>
        <Router />
      </Suspense>
      <Footer />
      <DecisionAssistantDock />
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AppShell />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
