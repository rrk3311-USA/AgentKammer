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
const About = lazy(() => import("@/pages/About"));
const RealEstate = lazy(() => import("@/pages/RealEstate"));
const RealEstateLight = lazy(() => import("@/pages/RealEstateLight"));
const RealEstateLightV2 = lazy(() => import("@/pages/RealEstateLightV2"));
const RealEstateLightV3 = lazy(() => import("@/pages/RealEstateLightV3"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const SavedSearches = lazy(() => import("@/pages/SavedSearches"));
const GetPreapproved = lazy(() => import("@/pages/GetPreapproved"));
const GetHomeValue = lazy(() => import("@/pages/GetHomeValue"));
const BrokerRegistration = lazy(() => import("@/pages/BrokerRegistration"));
const LiveDealMap = lazy(() => import("@/pages/LiveDealMap"));
const DocumentPortal = lazy(() => import("@/pages/DocumentPortal"));
const Coaching = lazy(() => import("@/pages/Coaching"));
const LuxuryTravel = lazy(() => import("@/pages/LuxuryTravel"));
const CommercialInvestment = lazy(() => import("@/pages/CommercialInvestment"));
const Contact = lazy(() => import("@/pages/Contact"));
const InternationalBuyers = lazy(() => import("@/pages/InternationalBuyers"));
const CaliforniaMarket = lazy(() => import("@/pages/CaliforniaMarket"));
const NewYorkMarket = lazy(() => import("@/pages/NewYorkMarket"));
const NevadaMarket = lazy(() => import("@/pages/NevadaMarket"));
const Audiobooks = lazy(() => import("@/pages/Audiobooks"));
const Ecourses = lazy(() => import("@/pages/Ecourses"));
const Downloads = lazy(() => import("@/pages/Downloads"));
const ContentStudio = lazy(() => import("@/pages/ContentStudio"));
const Profile = lazy(() => import("@/pages/Profile"));
const ReverseBuyerOrigination = lazy(() => import("@/pages/ReverseBuyerOrigination"));
const ReverseByerOriginationGuide = lazy(() => import("@/pages/ReverseByerOriginationGuide"));
const ReverseSellerOrigination = lazy(() => import("@/pages/ReverseSellerOrigination"));
const AdminRBO = lazy(() => import("@/pages/AdminRBO"));
const AffiliateProgram = lazy(() => import("@/pages/AffiliateProgram"));
const FreeTools = lazy(() => import("@/pages/FreeTools"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Refinancing = lazy(() => import("@/pages/Refinancing"));
const EShop = lazy(() => import("@/pages/EShop"));
const ArtGallery = lazy(() => import("@/pages/ArtGallery"));
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
      <Route path="/about" component={About} />
      <Route path="/real-estate" component={RealEstate} />
      <Route path="/real-estate-light" component={RealEstateLight} />
      <Route path="/real-estate-light-v2" component={RealEstateLightV2} />
      <Route path="/real-estate-light-v3" component={RealEstateLightV3} />
      
      {/* Real Estate Category Routes */}
      <Route path="/buying" component={() => <CategoryPage categoryId="buying" />} />
      <Route path="/selling" component={() => <CategoryPage categoryId="selling" />} />
      <Route path="/refinancing" component={Refinancing} />
      <Route path="/e-shop" component={EShop} />
      <Route path="/media-center" component={Home} />
      <Route path="/media-center/:slug" component={Home} />
      
      {/* Dashboard & Profile */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
      
      {/* Existing Routes */}
      <Route path="/saved" component={SavedSearches} />
      <Route path="/services/get-preapproved" component={GetPreapproved} />
      <Route path="/services/get-home-value" component={GetHomeValue} />
      <Route path="/broker-registration" component={BrokerRegistration} />
      <Route path="/live-deal-map" component={LiveDealMap} />
      <Route path="/document-portal" component={DocumentPortal} />
      <Route path="/coaching" component={Coaching} />
      <Route path="/luxury-travel" component={LuxuryTravel} />
      <Route path="/commercial-investment" component={CommercialInvestment} />
      <Route path="/contact" component={Contact} />
      <Route path="/international-buyers" component={InternationalBuyers} />
      <Route path="/california-market" component={CaliforniaMarket} />
      <Route path="/new-york-market" component={NewYorkMarket} />
      <Route path="/nevada-market" component={NevadaMarket} />
      <Route path="/audiobooks" component={Audiobooks} />
      <Route path="/ecourses" component={Ecourses} />
      <Route path="/downloads" component={Downloads} />
      <Route path="/studio" component={ContentStudio} />
      <Route path="/reverse-buyer-origination" component={ReverseBuyerOrigination} />
      <Route path="/rbo-guide" component={ReverseByerOriginationGuide} />
      <Route path="/reverse-seller-architecture" component={ReverseSellerOrigination} />
      <Route path="/admin/rbo" component={AdminRBO} />
      <Route path="/affiliates" component={AffiliateProgram} />
      <Route path="/free-tools" component={FreeTools} />
      <Route path="/art-gallery" component={ArtGallery} />
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
