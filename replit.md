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
- A hero section with two-line heading ("your perfect home / Discovered"), full-width navy horizontal bar containing AI description and bold "Live where you belong" subtitle with animated magic wand icon and glittering sparkles, glassmorphism search card over luxury property photo background (IMG_9579, 130% zoom).
- A redesign of the "NYC Command Center" with a compact, horizontal layout for Instant Alerts, Smart Search, and Market Analytics.
- Property listing UI updates, including price display overlay with time on market badge next to price, deal score badge next to property type, enhanced category backgrounds, and "Bowtie Navigation" with dark navy arrows for scrolling.
- A Live Interest Rate Ticker in the header with a minimal, animated design.
- Enhanced property card styling with pure white backgrounds (light mode) and pronounced drop shadows.
- Decorative sparkles and mouse pointer icons for visual dividers.
- Animated HTML5 infographic for "Agentic Actions" illustrating AI compute flow, data sources, and actions with dynamic visual effects.
- Market Analysis Report with a premium background image of a luxury marble desk with a Manhattan view.
- A personalized chat assistant avatar using the owner's professional headshot.
- Email capture forms with gold gradients and animated icons.

### Feature Specifications
- **Property Search & Discovery**: Advanced search, filtering, and curated listing sections (e.g., Featured, Most Discounted, Longest on Market).
- **Saved Searches**: Users can save search criteria and receive email notifications.
- **Service Pages**: Dedicated pages for mortgage pre-approval (`/services/get-preapproved`) and home valuation (`/services/get-home-value`) with comprehensive forms and a new timeline question for pre-qualification.
- **Market Analysis Reports**: Users can request property-specific listing reports.
- **AI Chat Assistant**: A floating chat assistant provides concierge support with voice input and pre-configured search prompts.
- **Email Digests**: Personalized property alerts via email capture forms.
- **Dynamic UI**: Real-time property data displayed via a `LiveTicker`.
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