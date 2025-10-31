# Agent Kammer - NYC Real Estate Platform

## Overview
Agent Kammer is a premium NYC real estate platform focused on luxury Manhattan properties, providing a sophisticated, visual-first search and discovery experience. Key capabilities include advanced search and filtering, saved searches with email notifications, curated property browsing, and integrated services for mortgage pre-approval and home valuation. The platform aims to build trust through professional aesthetics, drawing inspiration from high-end real estate brands and search-focused UX patterns. It leverages agentic AI to provide users with a competitive advantage in finding their dream home by continuously scanning the city for new listings and updates.

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
While basic user schema and session infrastructure are in place (Express session middleware with PostgreSQL store), full authentication and authorization are not yet implemented. The architecture supports session-based authentication.

### Theme System
A custom theme provider manages light/dark mode with `localStorage` persistence. An HSL-based color system with semantic tokens allows for comprehensive and dynamic styling, including elevation effects for UI elements.

### UI/UX Decisions
The platform features a visual-first approach with large images and sophisticated layouts. Specific UI elements include a tabbed floating chat assistant with quick prompt buttons, a hero section with an AI-centric tagline, a customizable "Happy Document Icon" for market reports, and a redesigned header with Manhattan location category icons. Decorative sparkles and mouse pointer icons are used for visual dividers. Email capture forms incorporate gold gradients and animated icons.

### Feature Specifications
*   **Property Search & Discovery**: Advanced search, filtering, and curated listing sections (e.g., Featured, Most Discounted, Longest on Market).
*   **Saved Searches**: Users can save search criteria and receive email notifications.
*   **Service Pages**: Dedicated pages for mortgage pre-approval (`/services/get-preapproved`) and home valuation (`/services/get-home-value`) with comprehensive forms.
*   **Market Analysis Reports**: Users can request property-specific listing reports, accessible via property cards and a dedicated section.
*   **AI Chat Assistant**: A floating chat assistant provides concierge support with voice input and pre-configured search prompts.
*   **Email Digests**: Daily digest preview converted to an email capture form for personalized property alerts.
*   **Dynamic UI**: Real-time property data displayed via a `LiveTicker`.
*   **Branding**: Professional NYC concierge avatar, gold accents, and a luxury aesthetic inspired by high-end real estate.

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

### Planned External Services (Future Integrations)
*   **Real Estate Data APIs**: Integration with providers like Zillow, Realtor.com, StreetEasy for live listings and market data.
*   **AI Chat Assistant Services**: Connection to external AI services for "real agentic AI response."
*   **Email Delivery Services**: For saved search alerts and daily property digests.
*   **Mobile App Platforms**: Planned iOS/Android native applications.

### Asset Management
*   **Static Assets**: Images stored in `attached_assets` (AI-generated, stock).
*   **Asset Resolution**: Vite configured with `@assets` alias.