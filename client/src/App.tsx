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
const IntelligenceHome = lazy(() => import("@/pages/IntelligenceHome"));
const Services = lazy(() => import("@/pages/Services"));
const ServiceLanding = lazy(() => import("@/pages/ServiceLanding"));
const Buy = lazy(() => import("@/pages/Buy"));
const Perspectives = lazy(() => import("@/pages/Perspectives"));
const Contact = lazy(() => import("@/pages/Contact"));
const Advisory = lazy(() => import("@/pages/Advisory"));
const Belonging = lazy(() => import("@/pages/Belonging"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Licenses = lazy(() => import("@/pages/Licenses"));
const Account = lazy(() => import("@/pages/Account"));
const HubHome = lazy(() => import("@/pages/hub/HubHome"));
const HubRoadmap = lazy(() => import("@/pages/hub/HubRoadmap"));
const HubConversations = lazy(() => import("@/pages/hub/HubConversations"));
const HubSaved = lazy(() => import("@/pages/hub/HubSaved"));
const HubReviews = lazy(() => import("@/pages/hub/HubReviews"));
const HubProfile = lazy(() => import("@/pages/hub/HubProfile"));
const AdminOverview = lazy(() => import("@/pages/AdminOverview"));
const AdminPortal = lazy(() => import("@/pages/AdminPortal"));
const AdminClients = lazy(() => import("@/pages/AdminClients"));
const AdminSection = lazy(() => import("@/pages/AdminSection"));
const InternationalHub = lazy(() => import("@/pages/InternationalHub"));
const InternationalCountry = lazy(() => import("@/pages/InternationalCountry"));
const BuildingReportDetail = lazy(() => import("@/pages/BuildingReportDetail"));
const PerspectiveArticle = lazy(() => import("@/pages/PerspectiveArticle"));
const ExecutiveHousingReport = lazy(() => import("@/pages/ExecutiveHousingReport"));
const RealEstateOwnership = lazy(() => import("@/pages/RealEstateOwnership"));
const RealEstateDeeds = lazy(() => import("@/pages/RealEstateDeeds"));
const RealEstateMortgages = lazy(() => import("@/pages/RealEstateMortgages"));
const FixedRateMortgage = lazy(() => import("@/pages/FixedRateMortgage"));
const AdjustableRateMortgage = lazy(() => import("@/pages/AdjustableRateMortgage"));
const MortgageClauses = lazy(() => import("@/pages/MortgageClauses"));
const ManhattanExplained = lazy(() => import("@/pages/ManhattanExplained"));
const LiensEasements = lazy(() => import("@/pages/LiensEasements"));
const Guides = lazy(() => import("@/pages/Guides"));
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
      <Route path="/admin/clients/:id" component={AdminClients} />
      <Route path="/admin/clients" component={AdminClients} />
      <Route path="/admin/pipeline" component={AdminPortal} />
      <Route path="/admin/conversations">{() => <AdminSection section="conversations" />}</Route>
      <Route path="/admin/reviews">{() => <AdminSection section="reviews" />}</Route>
      <Route path="/admin/tasks">{() => <AdminSection section="tasks" />}</Route>
      <Route path="/admin/reports">{() => <AdminSection section="reports" />}</Route>
      <Route path="/admin/calendar">{() => <AdminSection section="calendar" />}</Route>
      <Route path="/admin/team">{() => <AdminSection section="team" />}</Route>
      <Route path="/admin/settings">{() => <AdminSection section="settings" />}</Route>
      <Route path="/admin" component={AdminOverview} />
      <Route path="/admin/*">{() => <Redirect to="/admin" />}</Route>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/situations" component={Services} />
      <Route path="/situations/:slug">{({ slug }) => <ServiceLanding slug={slug} />}</Route>
      <Route path="/services">{() => <Redirect to="/situations" />}</Route>
      <Route path="/services/:slug">{({ slug }) => <Redirect to={`/situations/${slug}`} />}</Route>
      <Route path="/building-reports" component={Buildings} />
      <Route path="/building-reports/individual-buildings" component={BuildingReport} />
      <Route path="/building-reports/neighborhood-guides" component={NewYorkMarket} />
      <Route path="/building-reports/market-briefs" component={Intelligence} />
      <Route path="/building-reports/:slug" component={BuildingReportDetail} />
      <Route path="/buyer-advisory" component={Buy} />
      <Route path="/insights" component={Perspectives} />
      <Route path="/insights/reports/:slug" component={ExecutiveHousingReport} />
      <Route path="/insights/:slug" component={PerspectiveArticle} />
      <Route path="/contact" component={Contact} />
      <Route path="/advisory" component={Advisory} />
      <Route path="/intelligence" component={IntelligenceHome} />
      <Route path="/international/:country">
        {(params) => <InternationalCountry country={params.country} />}
      </Route>
      <Route path="/international" component={InternationalHub} />
      <Route path="/belonging" component={Belonging} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/licenses" component={Licenses} />
      <Route path="/guides/real-estate-ownership" component={RealEstateOwnership} />
      <Route path="/guides/real-estate-deeds" component={RealEstateDeeds} />
      <Route path="/guides/how-mortgages-work" component={RealEstateMortgages} />
      <Route path="/guides/fixed-rate-mortgage" component={FixedRateMortgage} />
      <Route path="/guides/adjustable-rate-mortgage" component={AdjustableRateMortgage} />
      <Route path="/guides/mortgage-clauses" component={MortgageClauses} />
      <Route path="/guides/manhattan-explained" component={ManhattanExplained} />
      <Route path="/guides/liens-easements" component={LiensEasements} />
      <Route path="/guides" component={Guides} />
      <Route path="/account" component={Account} />
      <Route path="/hub/roadmap" component={HubRoadmap} />
      <Route path="/hub/conversations" component={HubConversations} />
      <Route path="/hub/saved" component={HubSaved} />
      <Route path="/hub/reviews" component={HubReviews} />
      <Route path="/hub/profile" component={HubProfile} />
      <Route path="/hub" component={HubHome} />
      <Route path="/buildings">{() => <Redirect to="/building-reports" />}</Route>
      <Route path="/buildings/:slug/report">{({ slug }) => <Redirect to={`/building-reports/${slug}`} />}</Route>
      <Route path="/buy">{() => <Redirect to="/buyer-advisory" />}</Route>
      <Route path="/executive-relocation">{() => <Redirect to="/situations/executive-relocation-nyc" />}</Route>
      <Route path="/corporate-relocation">{() => <Redirect to="/situations/corporate-relocation-buyers-nyc" />}</Route>
      <Route path="/senior-downsizing">{() => <Redirect to="/situations/retiree-senior-home-buyers-nyc" />}</Route>
      <Route path="/school-district-planning">{() => <Redirect to="/situations/school-district-planning-nyc" />}</Route>
      <Route path="/military-relocation">{() => <Redirect to="/situations/military-relocation-nyc" />}</Route>
      <Route path="/physician-relocation">{() => <Redirect to="/situations/physician-relocation-nyc" />}</Route>
      <Route path="/finance-relocation">{() => <Redirect to="/situations/finance-hedge-fund-relocation-nyc" />}</Route>
      <Route path="/pet-friendly-moves">{() => <Redirect to="/situations/pet-friendly-moves-nyc" />}</Route>
      <Route path="/new-york-market">{() => <Redirect to="/building-reports/neighborhood-guides" />}</Route>
      <Route path="/perspectives">{() => <Redirect to="/insights" />}</Route>
      <Route path="/perspectives/reports/:slug">{({ slug }) => <Redirect to={`/insights/reports/${slug}`} />}</Route>
      <Route path="/perspectives/:slug">{({ slug }) => <Redirect to={`/insights/${slug}`} />}</Route>
      <Route path="/lease">{() => <Redirect to="/contact" />}</Route>
      <Route path="/sell">{() => <Redirect to="/contact" />}</Route>
      <Route path="/strategy">{() => <Redirect to="/buyer-advisory" />}</Route>
      <Route path="/buy-sell">{() => <Redirect to="/buyer-advisory" />}</Route>
      <Route path="/profile">{() => <Redirect to="/account" />}</Route>
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
        <Suspense fallback={<div className="min-h-screen bg-[#0D182B] px-6 py-12 font-[Inter,sans-serif] text-[#8A94A3]">Opening advisory…</div>}>
          <Router />
        </Suspense>
        <Toaster />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-brand-charcoal pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-brand-ink md:pb-[calc(5rem+env(safe-area-inset-bottom))]">
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
