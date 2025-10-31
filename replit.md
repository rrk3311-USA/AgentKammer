# Agent Kammer - NYC Real Estate Platform

## Overview

Agent Kammer is a premium NYC real estate platform designed to provide a sophisticated, visual-first property search and discovery experience. The application focuses on luxury Manhattan properties with features including advanced search and filtering, saved searches with email notifications, property browsing with curated collections, and integrated services for mortgage pre-approval and home valuation. The platform emphasizes trust-building through professional aesthetics inspired by premium real estate brands like Compass and Sotheby's International Realty, combined with search-focused UX patterns from Airbnb.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (October 31, 2025)

### Service Pages
- Created comprehensive "Get Pre-Approved" page at `/services/get-preapproved` with multi-step mortgage application form including fields for personal information, financial details, credit score ranges, and employment status
- Created "Get Your Home Value" page at `/services/get-home-value` with detailed property information form for requesting home valuations
- Both service pages feature hero images with gradient overlays, comprehensive side panel content explaining benefits, and toast notifications on form submission
- Service pages accessible via desktop navigation links in header and mobile menu

### Market Analysis Report Feature
- Added comprehensive "Get Your Listing Report" section with split layout (image left, form right)
- Section includes market analysis preview card showing report features (Market Trends, Neighborhood Data, Price Analysis, Comparable Sales)
- Form allows users to request reports by entering property address OR selecting a category (Luxury Condos, Penthouses, Townhouses, Co-ops, Waterfront, New Development)
- Added "Get Report" button (FileText icon) to every property card
- Clicking Get Report button opens email collection modal for instant market analysis PDF delivery
- Modal includes property-specific context and toast notification on submission

### Interactive Filters
- Upgraded Midtown location filter to polished 3-part toggle design (All/Above Midtown/Below Midtown)
- Toggle features rounded background container (bg-muted with shadow-inner) for unified appearance
- Active state shows primary background with black text and shadow
- Inactive states use muted foreground with hover elevation effects
- Filter only applies to "Longest on Market" section, preserving other property sections

### Design Updates
- Changed featured listing section icons from circular (`rounded-full`) to rounded rectangles (`rounded-lg`) for a more modern, structured appearance
- Updated all primary CTA buttons (Sign In, Search Properties) to use black text for improved contrast against gold background
- Updated Agent Kammer logo to new version with white background and gold accent on top hat detail
- Added Footer component with subtle gold gradient line above it (from-transparent via-primary to-transparent)
- Footer includes four-column layout with company info, services, company links, and social connections

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool. The application follows a component-based architecture with clear separation between UI components, pages, and business logic.

**Routing**: Uses `wouter` for lightweight client-side routing. Routes are defined centrally in `App.tsx`:
- `/` - Homepage with property search and curated listings
- `/saved` - Saved searches dashboard
- `/services/get-preapproved` - Mortgage pre-approval application
- `/services/get-home-value` - Home valuation request form

**State Management**: Leverages React Query (`@tanstack/react-query`) for server state management with custom query client configuration. Local component state uses React hooks (useState, useEffect).

**UI Component Library**: Built on shadcn/ui components (Radix UI primitives) with extensive customization. Components follow the "new-york" style variant with consistent theming through CSS variables.

**Styling Approach**: Tailwind CSS for utility-first styling with a custom design system defined in `tailwind.config.ts`. The design implements a dual-font typography system (Playfair Display for headlines, Inter for body text) and premium color scheme with gold accents for luxury branding.

**Design Philosophy**: Visual-first with large imagery, sophisticated layouts using max-width containers (max-w-6xl, max-w-7xl), and generous spacing. Components include property cards, horizontal scrolling galleries, hero search interfaces, floating chat assistants, and comprehensive service intake forms. Icon containers use rounded rectangles for featured sections, maintaining visual consistency across the platform.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript. The server handles API routes (prefixed with `/api`), static file serving, and Vite middleware integration in development.

**Development Setup**: Uses Vite's middleware mode for HMR (Hot Module Replacement) during development. Production builds bundle the server code with esbuild.

**Storage Layer**: Currently implements an in-memory storage interface (`MemStorage`) for development. The interface is designed to be replaced with a database implementation (see External Dependencies section).

**API Design**: RESTful API structure with routes registered in `server/routes.ts`. Includes request logging middleware that captures method, path, status, duration, and response data.

**Session Management**: Configured to use PostgreSQL session storage (`connect-pg-simple`) for production persistence.

### Data Storage Solutions

**Schema Definition**: Uses Drizzle ORM with PostgreSQL dialect. Database schema defined in `shared/schema.ts` with type-safe table definitions.

**Current Schema**: Implements a basic users table with id (UUID), username (unique), and password fields. Schema uses Zod for runtime validation through `drizzle-zod`.

**Migration Strategy**: Drizzle Kit configured for schema migrations with output to `./migrations` directory. Database connection expects `DATABASE_URL` environment variable.

**Planned Data Models**: While not yet implemented, the application structure suggests future schemas for properties, saved searches, property favorites, search criteria, and user preferences.

### Authentication and Authorization

**Current State**: Basic user schema exists but authentication/authorization is not yet implemented. The storage interface includes methods for `getUser`, `getUserByUsername`, and `createUser`.

**Session Infrastructure**: Express session middleware configured with PostgreSQL session store for production-ready session persistence.

**Planned Approach**: Architecture supports session-based authentication with secure cookie handling (credentials: "include" in API requests).

### Theme System

**Implementation**: Custom theme provider component managing light/dark mode with localStorage persistence. Theme applied via CSS class on document root element.

**Color System**: Comprehensive HSL-based color variables defined in `index.css` for both light and dark modes. Includes semantic tokens for background, foreground, primary, secondary, accent, destructive, and component-specific colors (card, popover, sidebar).

**Dynamic Styling**: Border colors and hover states use CSS custom properties for smooth theme transitions. Buttons and badges implement elevation effects through `hover-elevate` and `active-elevate-2` utilities.

## External Dependencies

### Third-Party UI Libraries

**Radix UI**: Comprehensive set of unstyled, accessible UI primitives including dialogs, dropdowns, popovers, tooltips, accordions, sliders, and form controls. Provides the foundation for all interactive components.

**Embla Carousel**: Used for horizontal property scrolling galleries with touch/swipe support.

**React Hook Form**: Form state management with `@hookform/resolvers` for Zod schema validation.

**Lucide React & React Icons**: Icon libraries for UI elements (Lucide) and brand icons (React Icons for App Store/Play Store badges).

### Database & ORM

**Neon Database**: Serverless PostgreSQL provider via `@neondatabase/serverless`. Configured in `drizzle.config.ts` expecting `DATABASE_URL` environment variable.

**Drizzle ORM**: Type-safe ORM for database operations with PostgreSQL dialect. Provides schema definition, query building, and migration tools.

**Note**: While Drizzle is configured for PostgreSQL (Neon), the application may be enhanced with any PostgreSQL-compatible database.

### Development Tools

**Vite**: Build tool and dev server with React plugin, runtime error overlay, and Replit-specific plugins (cartographer, dev banner) in development mode.

**TypeScript**: Strict type checking with path aliases for clean imports (`@/`, `@shared/`, `@assets/`).

**PostCSS & Autoprefixer**: CSS processing pipeline integrated with Tailwind CSS.

### Planned External Services

**Real Estate Data APIs**: Comments throughout the codebase indicate planned integration with real estate data providers (Zillow, Realtor.com, StreetEasy) for live property listings, market data, and pricing information.

**AI Chat Assistant**: Floating chat component (`FloatingChatAssistant`) includes TODO comments for "real agentic AI response" integration, suggesting planned connection to AI services for property concierge functionality.

**Email Delivery**: Email digest preview component suggests planned email notification system for saved search alerts and daily property digests.

**Mobile Apps**: App download component references iOS/Android apps, indicating planned native mobile applications.

### Asset Management

**Static Assets**: Images stored in `attached_assets` directory with subdirectories for `generated_images` (AI-generated property photos, logos) and `stock_images` (stock photography for service pages, hero sections).

**Asset Resolution**: Vite configured with `@assets` alias for clean image imports throughout components.

## Page Structure

### Homepage (`/`)
- Hero search interface with location and property type filters
- Featured Properties section with curated luxury listings (each card has View Details + Get Report buttons)
- Most Discounted section showing price-reduced properties
- Longest on Market section with 3-part toggle filter (All/Above Midtown/Below Midtown)
- Email digest preview component
- App download section with iOS/Android badges
- Get Your Listing Report section with market analysis preview and request form
- Final CTA section encouraging users to get started
- Footer with gold gradient line and four-column layout
- LiveTicker displaying real-time property data across full width
- FloatingChatAssistant positioned bottom-right for AI concierge support

### Service Pages
**Get Pre-Approved** (`/services/get-preapproved`):
- Hero section with inspiring stock photo of couple receiving house keys
- Comprehensive mortgage application form with validation
- Benefits sidebar explaining pre-approval advantages
- "What You'll Need" checklist for required documentation
- Toast notification on successful submission

**Get Your Home Value** (`/services/get-home-value`):
- Hero section with luxury home exterior photo
- Detailed property information intake form
- Market analysis and valuation process explanation
- Report contents preview listing deliverables
- Toast notification on successful submission

### Saved Searches (`/saved`)
- Dashboard for managing saved property search criteria
- Email notification preferences for new listings matching saved searches