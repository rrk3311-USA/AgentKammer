# Agent Kammer - NYC Real Estate Platform

## Overview
Agent Kammer is a premium NYC real estate platform focused on luxury Manhattan properties, providing a sophisticated, visual-first search and discovery experience. Key capabilities include advanced search and filtering, saved searches with email notifications, curated property browsing, and integrated services for mortgage pre-approval and home valuation. The platform aims to build trust through professional aesthetics, drawing inspiration from high-end real estate brands and search-focused UX patterns. It leverages agentic AI to provide users with a competitive advantage in finding their dream home by continuously scanning the city for new listings and updates. The business vision is to provide a competitive advantage to users in finding luxury homes in NYC.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built with **React and TypeScript** using **Vite**. It employs a component-based architecture with **`wouter`** for client-side routing. **React Query** manages server state, while **shadcn/ui** provides customizable UI components based on Radix UI. Styling is handled with **Tailwind CSS** and a custom design system featuring a dual-font typography and a premium gold-accented color scheme. The design philosophy emphasizes large imagery, sophisticated layouts, and generous spacing.

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
- A redesign of the "NYC Command Center" with a compact, horizontal layout for Instant Alerts, Smart Search, and Market Analytics.
- Property listing UI updates with unified glassmorphism info module featuring Apple-style glass UX design. All property information (price, title, address, beds/baths/sqft, property type, days on market, deal score) consolidated into single glass card overlay. Price displayed in clean white font (text-2xl) with smaller dollar sign, showing numeric value only (e.g., "2.50" instead of "$2.50M") to maximize photo visibility. Deal score badge features lightbulb icon (gold fill) with "X.X IQ" format. Enhanced category backgrounds use deep navy (#0a1628) with white text and gold icons for a sophisticated, premium appearance. Dark navy arrow navigation.
- A Live Interest Rate Ticker in the header with a minimal, animated design.
- Enhanced property card styling with pure white backgrounds (light mode) and pronounced drop shadows.
- Decorative sparkles and mouse pointer icons for visual dividers.
- Animated HTML5 infographic for "Agentic Actions" illustrating AI compute flow, data sources, and actions with dynamic visual effects.
- Market Analysis Report with a premium background image of a luxury marble desk with a Manhattan view.
- A personalized chat assistant avatar using the owner's professional headshot.
- Email capture forms with gold gradients and animated icons.
- Footer "Powered by AI" section on navy background featuring tech infrastructure logos: Replit, Anthropic, Claude, and NVIDIA.

### Feature Specifications
- **Property Search & Discovery**: Advanced search, filtering, and curated listing sections (e.g., Featured, Most Discounted, Longest on Market).
- **Saved Searches**: Users can save search criteria and receive email notifications.
- **Service Pages**: Dedicated pages for mortgage pre-approval (`/services/get-preapproved`) and home valuation (`/services/get-home-value`) with comprehensive forms and a new timeline question for pre-qualification.
- **Market Analysis Reports**: Users can request property-specific listing reports.
- **AI Chat Assistant**: A floating chat assistant provides concierge support with voice input and pre-configured search prompts.
- **Dream Home CTA**: Final call-to-action section with navy background featuring Agent Kammer (the hero character in black tuxedo tailcoat and gold-banded top hat) leading an elegant family into the storefront on the right side. Left side contains "Ready to Find Your Dream Home?" heading with cell phone number input form and gold gradient "Get Started" button.
- **Dynamic UI**: Real-time property data displayed via a `LiveTicker`.
- **Live Interest Rate Ticker**: Displays current 30-year fixed mortgage rates in elegant black and gold styling in the footer above "Powered by AI". Shows "Current Rate" with a fallback rate (6.82%) by default. When configured with an API key from API Ninjas (free tier available), it fetches real NY-specific mortgage rates every 5 minutes and displays live rates with animated decimal places that fluctuate slightly (simulating real-time market movement) and a green pulsing indicator. Visible on both mobile and desktop. To enable live rates: sign up at https://api-ninjas.com, get a free API key, and set the environment variable `VITE_MORTGAGE_API_KEY`.
- **Broker Registration Page**: A new page (`/broker-registration`) allowing brokers to create profiles with video pitches, professional bios, and specializations, supporting a client choice model.
- **Branding**: Professional NYC concierge avatar, gold accents, and a luxury aesthetic inspired by high-end real estate.

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