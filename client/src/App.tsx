import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
import LuxuryTravel from "@/pages/LuxuryTravel";
import CommercialInvestment from "@/pages/CommercialInvestment";
import Contact from "@/pages/Contact";
import InternationalBuyers from "@/pages/InternationalBuyers";
import CaliforniaMarket from "@/pages/CaliforniaMarket";
import NewYorkMarket from "@/pages/NewYorkMarket";
import NevadaMarket from "@/pages/NevadaMarket";
import Audiobooks from "@/pages/Audiobooks";
import Ecourses from "@/pages/Ecourses";
import Downloads from "@/pages/Downloads";
import ContentStudio from "@/pages/ContentStudio";
import ReverseBuyerOrigination from "@/pages/ReverseBuyerOrigination";
import ReverseByerOriginationGuide from "@/pages/ReverseByerOriginationGuide";
import AdminRBO from "@/pages/AdminRBO";
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
      <Route path="/admin/rbo" component={AdminRBO} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground pb-20 md:pb-14">
            <Header />
            <Router />
            <Footer />
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
