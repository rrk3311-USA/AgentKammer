# Agent Kammer - Luxury Properties Platform

## Overview
Agent Kammer is your luxury agentic real estate and travel concierge platform covering New York City and California markets, providing a sophisticated, visual-first search and discovery experience. Key capabilities include advanced search and filtering, saved searches with email notifications, curated property browsing, and integrated services for mortgage pre-approval and home valuation. The platform aims to build trust through professional aesthetics, drawing inspiration from high-end real estate brands and search-focused UX patterns. It leverages agentic AI to provide users with a competitive advantage in finding their dream home by continuously scanning multiple luxury markets for new listings and updates. The business vision is to provide a competitive advantage to users in finding luxury homes across premier markets.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with **React and TypeScript** using **Vite**. It employs a component-based architecture with **`wouter`** for client-side routing. **React Query** manages server state, while **shadcn/ui** provides customizable UI components based on Radix UI. Styling is handled with **Tailwind CSS** and a custom design system featuring a three-tier typography system (Cormorant display font for logo, Playfair Display for headings, Inter for body text) and a premium gold-accented color scheme. The design philosophy emphasizes large imagery, sophisticated layouts, and generous spacing.

### Backend Architecture
The backend uses **Express.js with Node.js and TypeScript**, handling API routes (prefixed with `/api`). It integrates with Vite's middleware for development and bundles with esbuild for production. An in-memory storage interface (`MemStorage`) is used for development, designed to be replaced by a database. The API follows a RESTful structure, and session management is configured for **PostgreSQL session storage** using `connect-pg-simple`.

### Data Storage Solutions
The application uses **Drizzle ORM** with a **PostgreSQL dialect** for type-safe schema definition and database operations. The current schema includes a basic `users` table. **Drizzle Kit** is configured for schema migrations.

### Authentication and Authorization
Basic user schema and session infrastructure are in place (Express session middleware with PostgreSQL store), supporting session-based authentication.

### Theme System
A custom theme provider manages light/dark mode with `localStorage` persistence. An HSL-based color system with semantic tokens allows for comprehensive and dynamic styling, including elevation effects for UI elements.

### UI/UX Decisions
The platform features a visual-first approach with large images and sophisticated layouts. Key UI elements include:
- A tabbed floating chat assistant with quick prompt buttons and voice input.
- A hero section with two-line heading ("Your Perfect Home / Discovered"), smooth gradient blend from top of page into navy horizontal bar containing AI description and bold "Live where you belong" subtitle with tiny animated gold heart bubbles on both left and right sides, glassmorphism search card over Agent Kammer storefront photo background with gradient overlay for seamless transition.
- A redesign of the "Property Command Center" with a compact, horizontal layout for Instant Alerts, Smart Search, and Market Analytics.
- Property listing UI updates with unified glassmorphism info module featuring Apple-style glass UX design. All property information (price, title, address, beds/baths/sqft, property type, days on market, deal score) consolidated into single glass card overlay. Price displayed in clean white font (text-2xl) with smaller dollar sign, showing numeric value only (e.g., "2.50" instead of "$2.50M") to maximize photo visibility. Deal score badge features lightbulb icon (gold fill) with "X.X IQ" format. Enhanced category backgrounds use deep navy (#0a1628) with white text and gold icons for a sophisticated, premium appearance. Dark navy arrow navigation.
- A Live Interest Rate Ticker in the header with a minimal, animated design.
- Enhanced property card styling with pure white backgrounds (light mode) and pronounced drop shadows.
- Decorative sparkles and mouse pointer icons for visual dividers.
- Compact "Agentic Actions" section featuring the Massive Compute Engine with Grok-5 AGI brain visualization as background. The section uses a single black card design with white text combining: (1) Hero section (220px) with AI brain background image cropped to center, enhanced waterfall animation with 40 programming language code snippets (doubled flow density) including random golden glowing elements (15% chance) with enhanced glow effects, and bottom action strip showing "Continuous Market Scanning" and "Instant Alert Processing" in monochrome design; (2) Statistics showing 240hrs average buyer search time vs 240+ hrs saved; (3) Ultra-compact data sources listing primary MLS/government sources and luxury market APIs. Entire section significantly reduced in vertical space for improved scrolling experience.
- Market Analysis Report with a premium background image of a luxury marble desk with a city skyline view.
- A personalized chat assistant avatar using the owner's professional headshot.
- Email capture forms with gold gradients and animated icons.
- Footer "Powered by AI" section on navy background featuring tech infrastructure logos: Replit, Anthropic, Claude, and NVIDIA.

### Feature Specifications
- **Property Search & Discovery**: Advanced search, filtering, and curated listing sections (e.g., Featured, Most Discounted, Longest on Market).
- **Saved Searches**: Users can save search criteria and receive email notifications.
- **Service Pages**: Dedicated pages for mortgage pre-approval (`/services/get-preapproved`) and home valuation (`/services/get-home-value`) with comprehensive forms and a new timeline question for pre-qualification.
- **Market Analysis Reports**: Users can request property-specific listing reports.
- **AI Chat Assistant**: A floating chat assistant powered by OpenAI (via Replit AI Integrations) provides luxury concierge support with voice input, pre-configured search prompts, and intelligent lead qualification. The AI naturally asks qualifying questions about timeline, financing, commitment, and motivation without mentioning "lead scoring" or CRM terminology. Lead information is automatically captured and stored in the database with calculated lead scores based on the qualification framework. Each conversation session maintains context and progressively builds lead profiles.
- **Live Deal Map**: Interactive Google Maps integration (`/live-deal-map`) with elegant gray/black/white/gold styling showing luxury property locations with Deal IQ scores. Features a bubbly, orb-like button with gold gradient, glow effect, and shine animation that appears below the "Longest on Market" section. Map requires `VITE_GOOGLE_MAPS_API_KEY` environment variable.
- **Dream Home CTA**: Final call-to-action section with navy background featuring Agent Kammer (the hero character in black tuxedo tailcoat and gold-banded top hat) leading an elegant family into the storefront on the right side. Left side contains "Ready to Find Your Dream Home?" heading with cell phone number input form and gold gradient "Get Started" button.
- **Dynamic UI**: Real-time property data displayed via a `LiveTicker` with deep navy background (#0a1628), gold-outlined ticker items, gold prices displayed first for maximum visibility, white text for optimal legibility, and 35s scroll animation (fast-paced).
- **Live Interest Rate Ticker**: Displays current 30-year fixed mortgage rates in elegant black and gold styling in the footer above "Powered by AI". Shows "Current Rate" with a fallback rate (6.82%) by default. When configured with an API key from API Ninjas (free tier available), it fetches real NY-specific mortgage rates every 5 minutes and displays live rates with animated decimal places that fluctuate slightly (simulating real-time market movement) and a green pulsing indicator. Visible on both mobile and desktop. To enable live rates: sign up at https://api-ninjas.com, get a free API key, and set the environment variable `VITE_MORTGAGE_API_KEY`.
- **Broker Registration Page**: A new page (`/broker-registration`) allowing brokers to create profiles with video pitches, professional bios, and specializations, supporting a client choice model.
- **Strategic Document Portal**: A comprehensive document management system (`/document-portal`) designed to help buyers win competitive bidding wars. Features 5 color-coded categories: Getting Started (blue), Competitive Advantage (gold), Strategic Bidding (green), Due Diligence (purple), and Closing Documents (orange). Includes expandable fillable forms, file upload capability, required document indicators, and California-specific CAR forms. Positioned as a strategic competitive advantage tool rather than simple document storage.
- **Transformational Alignment Coaching**: A dedicated coaching services page (`/coaching`) showcasing transformational alignment coaching offerings with a live list of 4 programs: Clarity & Vision Session ($497), Alignment Accelerator ($2,997, marked as "Most Popular"), Mastery & Integration ($5,997), and VIP Transformation Day ($7,500). Features educational sections on coaching pillars, client criteria, and email waitlist signup. Designed to complement the luxury real estate services with personal transformation offerings.
- **Luxury Travel Experiences**: A dedicated travel page (`/luxury-travel`) featuring 4 bespoke adventure journey packages: NYC Private Collection, California Coastal Adventure, Thailand Expedition, and Berlin Architecture & Culture. Each package includes detailed itineraries, pricing, and unique novelty experiences. Emphasizes "Novelties is our specialty" with one-of-a-kind adventurous experiences across premium destinations.
- **Wellness Shop**: E-commerce page (`/wellness-shop`) featuring 12 premium supplement products ranging from $34.99 to $94.99. Includes nootropics, adaptogens, omega-3, sleep support, cellular energy, probiotics, immune support, collagen, mushroom extracts, electrolytes, NAD+ boosters, and creatine. Features shopping cart functionality, star ratings, benefit tags, stock status indicators, and responsive grid layout (1-4 columns).
- **Commercial Real Estate Investment**: Live-updating feed page (`/commercial-investment`) showcasing 8 California commercial properties for sale. Features API-style presentation with auto-updating timestamps (every 10 seconds), manual refresh capability, and comprehensive investment metrics including cap rates, NOI, occupancy, and zoning. Property types include office buildings, retail centers, mixed-use, industrial warehouses, hotels, and medical offices. Prices range from $4.2M to $22.5M across Oakland, Los Angeles, San Francisco, Sacramento, Long Beach, San Jose, San Diego, and Irvine markets.
- **Branding**: Professional luxury concierge avatar, gold accents, and a luxury aesthetic inspired by high-end real estate. Multi-market focus on New York City and California displayed prominently with stylish "NYC · CA" formatting. Tagline: "Your Luxury Agentic Real Estate & Travel Concierge".

## External Dependencies

### Third-Party UI Libraries
*   **Radix UI**: Unstyled, accessible UI primitives.
*   **Embla Carousel**: For horizontal scrolling galleries.
*   **React Hook Form**: Form state management with Zod validation.
*   **Lucide React & React Icons**: Icon libraries.

### Database & ORM
*   **Neon Database**: Serverless PostgreSQL provider.
*   **Drizzle ORM**: Type-safe ORM for PostgreSQL.

### Development Tools
*   **Vite**: Build tool and dev server.
*   **TypeScript**: For strict type checking.
*   **PostCSS & Autoprefixer**: CSS processing.

### Asset Management
*   **Static Assets**: Images stored in `attached_assets` (AI-generated, stock).
*   **Asset Resolution**: Vite configured with `@assets` alias.