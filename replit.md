# Agent Kammer - NYC Real Estate Platform

## Overview
Agent Kammer is a premium NYC real estate platform focused on luxury Manhattan properties, providing a sophisticated, visual-first search and discovery experience. Key capabilities include advanced search and filtering, saved searches with email notifications, curated property browsing, and integrated services for mortgage pre-approval and home valuation. The platform aims to build trust through professional aesthetics, drawing inspiration from high-end real estate brands and search-focused UX patterns. It leverages agentic AI to provide users with a competitive advantage in finding their dream home by continuously scanning the city for new listings and updates.

## User Preferences
Preferred communication style: Simple, everyday language.

## User Identity
- **Owner**: Raphael Kammer
- **Photo**: `IMG_1044_1761929739320.jpeg` - Professional headshot used as chat assistant avatar

## Recent Changes (October 31, 2025)

### NYC Command Center Redesign
- **Compact Layout**: Reduced section size by consolidating three features into single card
- **Horizontal Layout**: All three features (Instant Alerts, Smart Search, Market Analytics) displayed side-by-side in one container
- **Reduced Padding**: Smaller py-12 lg:py-16 (down from py-20 lg:py-32) for less vertical space
- **Unified Description**: Combined text under one card instead of three separate cards

### Market Analysis Report Luxury Redesign
- **Premium Background**: Generated luxury white Carrara marble desk image with Manhattan skyline visible through window
- **Sophisticated Aesthetic**: High-end real estate office setting with natural lighting and elegant shadows
- **Enhanced Visual Card**: Larger, more prominent overlay card with gold accents and improved spacing
- **Professional Photography**: Commercial-quality image (`Luxury_marble_desk_Manhattan_view_647cbb4e.png`) replacing generic stock photo
- **Note**: Video asset `DB6A97E2-CB97-429E-AB9E-8D9DA8946139_1761929696844.mp4` available as potential pamphlet cover content

### Voice Chat & Avatar Updates
- **Voice Input Feature**: Added voice-to-text capability in chat assistant using Web Speech API
  - Microphone button toggles voice recording (works in Chrome, Edge, Safari)
  - Visual feedback: button pulses when listening, input shows "Listening..." placeholder
  - Automatic transcription fills text input, ready to send
  - Status message shows "🎤 Listening... Speak now" while active
- **Personal Avatar**: Chat assistant now uses actual photo of owner Raphael Kammer
  - Avatar image: `IMG_1044_1761929739320.jpeg` (professional headshot of Raphael Kammer)
  - Personalizes the concierge experience with the real owner's identity
  - Maintains sophisticated luxury branding with authentic personal touch
- **Hero Section Divider**: Replaced code-themed elements with decorative sparkles and mouse pointer icons
  - Tiny animated sparkles and mouse clicks in staggered pulse animation
  - Creates subtle divider effect below agentic AI tagline

### Floating Chat Assistant Enhancement
- **Tabbed Interface**: Two-tab system (Popular Prompts | Chat)
- **6 Quick Prompt Buttons**: Pre-configured searches in 2-column grid (Best Deal, Longest on Market, Safest Locations, Best School Zones, Recently Reduced, New Listings)
- Clicking any prompt button automatically sends message and switches to chat tab

### Agentic Actions Infographic
- **Visual Mind Map**: Top hat emoji (🎩) at center with branching lines showing AI compute flow
- **5 Agentic Actions**: Continuous Market Scanning, Instant Alert Processing, Price Trend Analysis, Smart Notifications, Competitive Bidding Intelligence
- **Time-Saving Statistics**: 240hrs average buyer search time vs 24/7 Agent Kammer automation
- **Quote Banner**: "When brokers compete, you win" with CTA button to prequalification
- **Design**: Gradient background, dotted branch lines, hover effects on action cards

### Prequalification Page Updates
- **Timeline Question Added**: "How soon are you looking to move?" with three options:
  - Moving Soon (within 3 months)
  - Looking to Move (3-6 months)
  - Just Browsing (6+ months)
- Helps qualify leads and personalize the experience based on buyer urgency

### Broker Registration Page
- **New Page**: `/broker-registration` for brokers to join the network
- **Video Pitch Upload**: Brokers upload 60-90 second "about me" videos to pitch themselves
- **Comprehensive Profile**: Fields include personal info, license number, years of experience, brokerage firm, specialization, neighborhoods covered
- **Professional Bio**: Text area for brokers to describe their approach and expertise
- **Social Links**: Optional LinkedIn and personal website fields
- **Client Choice Model**: Users choose brokers based on watching their pitch videos
- **Premium Network**: Info cards highlighting benefits (Premium Network, Qualified Leads, Client Choice)

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