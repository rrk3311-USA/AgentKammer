# Agent Kammer - Luxury Properties Platform

## Overview
Agent Kammer is a luxury agentic real estate and travel concierge platform serving NYC, California, and Nevada markets. It provides a visual-first search and discovery experience for luxury properties, offering advanced search, saved listings with notifications, and integrated services like mortgage pre-approval and home valuation. The platform leverages agentic AI to provide a competitive advantage to users by continuously scanning multiple luxury markets for new listings and updates, aiming to build trust through professional aesthetics inspired by high-end real estate brands. Its business vision is to empower users in finding luxury homes across premier markets. Tagline: "Your Luxury Agentic Real Estate Concierge."

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
The frontend uses React and TypeScript with Vite, employing a component-based architecture and `wouter` for routing. React Query manages server state, while shadcn/ui provides customizable components styled with Tailwind CSS. The design system features a gold-accented color scheme and a three-tier typography system (Cormorant, Playfair Display, Inter), emphasizing large imagery and sophisticated layouts. It includes a custom theme provider for light/dark mode.

### Backend
The backend is built with Express.js, Node.js, and TypeScript, handling RESTful API routes. It integrates with Vite's middleware for development and uses esbuild for production bundling. Session management uses PostgreSQL session storage via `connect-pg-simple`. OpenAI integration via Replit AI provides GPT-4o-mini powered chat with automatic lead extraction and persistence.

### Data Storage
Drizzle ORM with the neon-http adapter is used for PostgreSQL connections. The database schema includes `users` for authentication and `leads` for CRM, capturing detailed qualification fields. Database migrations are managed with `npm run db:push`.

### Authentication
Basic session-based authentication is implemented using Express session middleware with a PostgreSQL store.

### UI/UX Design
The platform adopts a visual-first approach with large imagery and sophisticated layouts. Key UI/UX elements include:
- A tabbed floating chat assistant with quick prompts and voice input.
- A hero section with a two-line heading, AI description, and a glassmorphism search card.
- A compact "Property Command Center" with a horizontal layout.
- Property listing UI with a unified glassmorphism info module.
- A Live Interest Rate Ticker in the header.
- Enhanced property card styling with pure white backgrounds and pronounced shadows.
- An "Agentic Actions" section featuring modular Agentic Compute visualization with live telemetry, capabilities grid, data sources (scanning 8 top luxury brands: Christie's International, Sotheby's Intl Realty, Engel & Völkers, Corcoran, Compass, The Agency, Coldwell Banker Luxury, Douglas Elliman), tech stack, animated backdrop, and compact brain visualization with code waterfall animation.
- Market Analysis Report with a premium background image.
- A personalized chat assistant avatar and gold-gradient email capture forms.
- Footer with "Powered by AI" section, tech infrastructure logos, and Strategic Document Portal link.
- Header with Documents and Contact buttons (Contact opens the chat assistant).

### Feature Specifications
- **Property Search & Discovery**: Advanced search, filtering, and curated listings.
- **Saved Searches**: Users can save criteria and receive email notifications.
- **Service Pages**: Dedicated pages for mortgage pre-approval and home valuation with comprehensive forms.
- **Market Analysis Reports**: On-demand property-specific reports.
- **AI Chat Assistant with CRM Lead Capture**: GPT-4o-mini powered assistant with an ELITE "Sophisticated Closer" personality - blending state concierge elegance with Jordan Belfort persistence. Warm, refined, and gracious with phrases like "Blessings to you," "May I have the pleasure," yet relentlessly persistent and never takes no for an answer. Uses sophisticated emojis (🎩✨🏆💎), sends multiple elegant follow-ups even without response, and NEVER backs off until getting complete info (Name, Timeline, Budget, Email, Phone). Features refined button-style multiple choice options with emoji indicators (🅰️🅱️🅲️🅳️), keeps conversations alive with 5-10+ messages, graciously handles rejection and rephrases elegantly. Includes automatic, hidden `LEAD_DATA` JSON block extraction, session-based tracking, database persistence to the `leads` table with calculated lead scores, and voice input support. Dark navy header with white text, medium blue user bubbles, and gold agent bubbles with black text. All interactive buttons feature addictive crunchy chime sound effects using Web Audio API for satisfying user engagement.
- **Live Deal Map**: Interactive Google Maps integration with custom styling and Deal IQ scores.
- **Dream Home CTA**: Call-to-action section with a phone number input form.
- **Dynamic UI**: Real-time property data displayed via a `LiveTicker`.
- **Live Interest Rate Ticker**: Displays current 30-year fixed mortgage rates, optionally fetching live data from API Ninjas.
- **Broker Registration Page**: Allows brokers to create profiles with bios and specializations.
- **Strategic Document Portal**: A document management system for competitive bidding, categorized by strategic stages, with fillable forms and file uploads.
- **Transformational Alignment Coaching**: Dedicated page for coaching services with program listings and educational content.
- **Luxury Travel Experiences**: Page showcasing bespoke adventure journey packages.
- **Wellness Shop**: E-commerce page for premium supplement products with cart functionality.
- **Commercial Real Estate Investment**: Live-updating feed page for California commercial properties with investment metrics.
- **Contact Page**: Beautiful landing page with photo collage of luxury bar/interior images, contact information cards, comprehensive contact form, and CTA section.
- **California Market Dashboard**: Comprehensive data dashboard with Q1 2025 real market data including highest yielding counties (Riverside 9%, Santa Clara 9%, San Diego 5.2%), top luxury ZIP codes (Atherton $8.33M, Newport Beach $5.72M), 5-10 year growth projections ($338B US luxury market by 2030), appreciation rates by county, buyer/seller market indicators, and investment strategies. Features real-time metrics, regional performance comparisons, and hidden opportunity markets.
- **NYC Market Dashboard**: Real-time NYC luxury market data with Manhattan median at $1.175M (+12% YoY), Brooklyn at $1.1M (+7.6%), highest yielding neighborhoods (TriBeCa 4.5%, East Village 4.5%, Chelsea 4.2%), top luxury neighborhoods (Hudson Yards $5.95M, TriBeCa $4.15M, SoHo $3.69M), 20-30% cumulative growth projections 2025-2030, borough comparisons, and market indicators showing balanced market with seller advantage.
- **Nevada Market Dashboard**: Comprehensive Nevada luxury market data covering Las Vegas ($1.4M luxury median, record high), Reno ($542,850 median, +9% YoY, strong seller's market with 1.51 months supply), and Lake Tahoe luxury markets (Incline Village $2.06M, West Shore $3.13M, Truckee $1.27M). Features highest yielding neighborhoods (Summerlin, Henderson, MacDonald Highlands $1-10M+), 12-25% Lake Tahoe luxury growth projections 2025-2030, major economic drivers ($10.3B film studio investment, sports/entertainment, high-speed rail), and regional market performance comparisons.
- **PDF Market Reports**: Downloadable branded market reports for California, NYC, and Nevada markets. Features include professional cover page with emblem and "MARKET REPORT" branding (instead of "NYC REAL ESTATE"), comprehensive market data formatting, contact information in footer, email delivery via Resend with PDF attachment, and lead capture in database. Users enter email to receive instant PDF report.
- **Process Flow Section**: Visual representation of the platform's unique approach showing the 4-step journey: Client → Encrypted Trust Layer (Anonymous LLC structure for privacy) → Bidding Profile (leverage display with cash and buying power) → Brokers Compete (reverse auction model). Emphasizes how the platform flips traditional real estate power dynamics.
- **Branding**: Professional luxury concierge avatar, gold accents, and multi-market focus on NYC, California, and Nevada.

## External Dependencies

### Third-Party UI Libraries
*   **Radix UI**: Accessible UI primitives.
*   **Embla Carousel**: For horizontal galleries.
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
*   **Static Assets**: Images stored in `attached_assets`.

### APIs & Integrations
*   **OpenAI**: For AI chat capabilities (via Replit AI Integrations).
*   **API Ninjas**: (Optional) For live mortgage rate data.
*   **Google Maps**: For the Live Deal Map.