import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock as ClockIcon } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

declare global {
  interface Window {
    initMap?: () => void;
    google?: any;
  }
}

export default function LiveDealMap() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

    // Gray and white only - minimal styling
    const grayWhiteStyles = [
      {
        "elementType": "geometry",
        "stylers": [{ "color": "#e8e8e8" }]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#333333" }]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#ffffff" }]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#666666" }]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#d0d0d0" }]
      },
      {
        "featureType": "poi",
        "stylers": [{ "visibility": "off" }]
      },
      {
        "featureType": "transit",
        "stylers": [{ "visibility": "off" }]
      }
    ];

    const map = new google.maps.Map(mapElement, {
      center: { lat: 40.7589, lng: -73.9851 }, // Times Square, NYC
      zoom: 12,
      styles: grayWhiteStyles,
      disableDefaultUI: true,
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      draggable: false,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      gestureHandling: 'none',
    });

    // Add simple gray markers
    const properties = [
      { lat: 40.7589, lng: -73.9851 },
      { lat: 40.7614, lng: -73.9776 },
      { lat: 40.7549, lng: -73.9840 },
      { lat: 40.7580, lng: -73.9855 },
      { lat: 40.7620, lng: -73.9800 },
    ];

    properties.forEach((prop) => {
      new google.maps.Marker({
        position: { lat: prop.lat, lng: prop.lng },
        map: map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#666666",
          fillOpacity: 0.8,
          strokeColor: "#333333",
          strokeWeight: 1,
          scale: 6,
        },
      });
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const propertyDetails = [
    {
      id: 1,
      address: "450 West 42nd Street, Manhattan, NY",
      price: "$2.5M",
      dealIQ: 8.5,
      beds: 2,
      baths: 2,
      sqft: "1,450",
      type: "Condo",
      daysOnMarket: 12
    },
    {
      id: 2,
      address: "1200 Club View Drive, Beverly Hills, CA",
      price: "$4.2M",
      dealIQ: 9.2,
      beds: 3,
      baths: 2.5,
      sqft: "2,100",
      type: "Villa",
      daysOnMarket: 8
    },
    {
      id: 3,
      address: "11 Promontory Ridge Lane, Las Vegas, NV",
      price: "$3.8M",
      dealIQ: 8.7,
      beds: 2,
      baths: 2,
      sqft: "1,800",
      type: "Estate",
      daysOnMarket: 15
    },
    {
      id: 4,
      address: "301 East 50th Street, Manhattan, NY",
      price: "$5.5M",
      dealIQ: 9.5,
      beds: 4,
      baths: 3,
      sqft: "2,800",
      type: "Penthouse",
      daysOnMarket: 6
    },
    {
      id: 5,
      address: "9201 Sunset Boulevard, Beverly Hills, CA",
      price: "$2.9M",
      dealIQ: 8.3,
      beds: 2,
      baths: 2,
      sqft: "1,600",
      type: "Condo",
      daysOnMarket: 18
    },
  ];

  return (
    <div className="min-h-screen bg-white">
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
                Explore luxury properties across NYC, LA & NV
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6">
          {/* Map Container - 70% */}
          <div className="w-[70%]">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg border border-gray-300" style={{ height: '600px' }}>
              <div id="map" className="w-full h-full" data-testid="map-container"></div>
            </div>
          </div>

          {/* Info Panel - 30% */}
          <div className="w-[30%] space-y-4">
            {/* Live Clock */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <ClockIcon className="h-5 w-5 text-gray-600" />
                <h3 className="font-serif text-lg font-semibold text-gray-900">Eastern Time</h3>
              </div>
              <div className="font-mono text-2xl font-bold text-gray-900" data-testid="live-clock">
                {formatTime(currentTime)}
              </div>
            </div>

            {/* Scrollable Property Details */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-lg" style={{ height: '520px', overflowY: 'auto' }}>
              <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4 sticky top-0 bg-gray-100 pb-2">
                Active Listings
              </h3>
              <div className="space-y-4">
                {propertyDetails.map((property) => (
                  <div key={property.id} className="bg-white border border-gray-300 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-gray-900 text-sm">{property.address}</div>
                      <Badge className="bg-gray-900 text-white text-xs ml-2">{property.dealIQ} IQ</Badge>
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-2">{property.price}</div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>{property.beds} bd • {property.baths} ba</div>
                      <div>{property.sqft} sqft</div>
                      <div>{property.type}</div>
                      <div>{property.daysOnMarket} days</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
