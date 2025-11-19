# Agent Kammer - Luxury Properties Platform

## Overview
Agent Kammer is a zero-knowledge encrypted real estate and travel concierge platform focused on NYC, California, and Nevada markets. Emphasizing Swiss-level privacy and zero-access architecture, it offers a visual-first search experience, advanced search, saved listings with notifications, and integrated services like mortgage pre-approval and home valuation. The platform leverages agentic AI for continuous market scanning while maintaining military-grade encryption for all client data and documents. Its business vision is to empower users in finding luxury homes across premier markets while protecting their privacy with the highest level of encryption available.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
The platform features a visual-first approach with large imagery, a gold-accented color scheme, and a three-tier typography system (Cormorant, Playfair Display, Inter). It includes a custom theme provider for light/dark mode, glassmorphism elements, and enhanced property card styling. Key UI components include a tabbed floating chat assistant, a "Property Command Center," and an "Agentic Actions" section with modular Agentic Compute visualization. Specific design elements extend to personalized chat avatars, gold-gradient email forms, and a footer with "Powered by AI" branding.

### Technical Implementations
The frontend uses React, TypeScript, and Vite, with `wouter` for routing and React Query for server state management. `shadcn/ui` provides customizable components styled with Tailwind CSS. The backend is built with Express.js, Node.js, and TypeScript, providing RESTful API routes. Session management is handled via `connect-pg-simple` with PostgreSQL. OpenAI integration powers the chat assistant for lead extraction.

### Feature Specifications
- **Property Search & Discovery**: Advanced search, filtering, and curated listings.
- **Saved Searches**: Users can save criteria and receive email notifications.
- **Service Pages**: Mortgage pre-approval and home valuation forms.
- **Market Analysis Reports**: On-demand property-specific reports for California, NYC, and Nevada, with downloadable PDF versions.
- **AI Chat Assistant with CRM Lead Capture**: GPT-4o-mini powered, "Sophisticated Closer" personality, persistent lead capture (Name, Timeline, Budget, Email, Phone), automatic `LEAD_DATA` JSON extraction, session tracking, database persistence to `leads` table with lead scores, and voice input. Features engaging sound effects.
- **Live Deal Map**: Interactive Google Maps integration with custom styling and Deal IQ scores.
- **Live Interest Rate Ticker**: Displays current 30-year fixed mortgage rates.
- **Broker Registration Page**: Allows brokers to create profiles.
- **Strategic Document Portal**: Zero-knowledge encrypted document management for competitive bidding with AES-256 client-side encryption.
- **Transformational Alignment Coaching**: Dedicated page for coaching services.
- **Luxury Travel Experiences**: Showcasing bespoke adventure packages.
- **Wellness Shop**: E-commerce for premium supplements.
- **Commercial Real Estate Investment**: Live-updating feed page for California properties.
- **Audiobooks Page**: Premium library of 9 audiobooks with unique AI-generated artwork, detailed descriptions, and lead capture for samples.
- **Ecourses Page**: Premium online courses for luxury real estate professionals, including a featured course on "Perfect Decision-Making."
- **Downloads Page**: Library of free downloadable resources and templates for real estate professionals.
- **Process Flow Section**: Visual representation of the platform's 4-step unique approach (Client → Encrypted Trust Layer → Bidding Profile → Brokers Compete) via a horizontal carousel.
- **Content Studio (Internal)**: Private management system for social media video content workflow (Ideation → Legal Review → Ready to Shoot → Completed) with CRUD operations and publishing destination tracking.

### System Design Choices
The system uses Drizzle ORM with neon-http for PostgreSQL connections. Authentication is session-based. The database schema includes `users`, `leads`, and `contentItems`. The platform is designed for scalability and emphasizes secure, type-safe development practices.

## External Dependencies

### Database & ORM
*   **Neon Database**: Serverless PostgreSQL provider.
*   **Drizzle ORM**: Type-safe ORM for PostgreSQL.

### APIs & Integrations
*   **OpenAI**: For AI chat capabilities (via Replit AI Integrations).
*   **API Ninjas**: (Optional) For live mortgage rate data.
*   **Google Maps**: For the Live Deal Map.

### Third-Party UI Libraries
*   **Radix UI**: Accessible UI primitives.
*   **Embla Carousel**: For horizontal galleries.
*   **React Hook Form**: Form state management with Zod validation.
*   **Lucide React & React Icons**: Icon libraries.