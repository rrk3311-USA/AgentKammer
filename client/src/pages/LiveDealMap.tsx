import { useEffect } from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    initMap?: () => void;
    google?: any;
  }
}

export default function LiveDealMap() {
  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}&callback=initMap`;
    script.async = true;
    script.defer = true;
    window.initMap = initMap;
    document.head.appendChild(script);

    return () => {
      if (window.initMap) {
        delete window.initMap;
      }
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initMap = () => {
    const mapElement = document.getElementById('map');
    if (!mapElement || !window.google) return;

    const google = window.google;

    // Elegant gray, black, white, gold styling
    const elegantStyles = [
      {
        "elementType": "geometry",
        "stylers": [{ "color": "#1a1a1a" }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#0a0a0a" }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#d4af37" }]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#d4af37" }]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#888888" }]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#2a2a2a" }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#2d2d2d" }]
      },
      {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#1a1a1a" }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#999999" }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#3a3a3a" }]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{ "color": "#1f1f1f" }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#0a1628" }]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#666666" }]
      }
    ];

    const map = new google.maps.Map(mapElement, {
      center: { lat: 40.7589, lng: -73.9851 }, // Times Square, NYC
      zoom: 13,
      styles: elegantStyles,
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    });

    // Add some sample property markers with gold pins
    const properties = [
      { lat: 40.7589, lng: -73.9851, title: "Luxury Penthouse - $4.2M", score: 9.2 },
      { lat: 40.7614, lng: -73.9776, title: "Modern Condo - $3.8M", score: 8.7 },
      { lat: 40.7549, lng: -73.9840, title: "Classic Townhouse - $5.5M", score: 9.5 },
      { lat: 40.7580, lng: -73.9855, title: "Contemporary Loft - $2.9M", score: 8.3 },
    ];

    properties.forEach((prop) => {
      const marker = new google.maps.Marker({
        position: { lat: prop.lat, lng: prop.lng },
        map: map,
        title: prop.title,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#d4af37",
          fillOpacity: 0.9,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 10,
        },
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; font-family: sans-serif;">
            <h3 style="margin: 0 0 4px 0; color: #0a1628; font-size: 14px; font-weight: 600;">${prop.title}</h3>
            <p style="margin: 0; color: #666; font-size: 12px;">Deal IQ Score: ${prop.score}</p>
          </div>
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-[#0a1628] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mb-4 text-white hover:text-[#d4af37] -ml-2"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Properties
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shadow-lg">
              <MapPin className="h-6 w-6 text-[#d4af37]" />
            </div>
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-semibold mb-2">
                Live Deal Map
              </h1>
              <p className="text-white/70">
                Explore luxury properties across Manhattan in real-time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[calc(100vh-200px)]">
        <div id="map" className="w-full h-full" data-testid="map-container"></div>
        
        {/* Elegant overlay info */}
        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-80">
          <div className="backdrop-blur-xl bg-black/80 border border-white/20 rounded-lg p-4 shadow-2xl">
            <h3 className="font-serif text-lg font-semibold text-white mb-2">
              Market Overview
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/80">
                <span>Active Listings:</span>
                <span className="text-[#d4af37] font-medium">247</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>Avg Deal IQ:</span>
                <span className="text-[#d4af37] font-medium">8.4</span>
              </div>
              <div className="flex justify-between text-white/80">
                <span>New This Week:</span>
                <span className="text-[#d4af37] font-medium">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
