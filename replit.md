# Agent Kammer - Financial Comparison Platform

## Overview
Agent Kammer is an AI-powered financial services comparison engine that helps users find the best products across 13 financial categories. The platform uses an agentic AI comparison engine that ranks products based on user profiles, featuring deterministic scoring for consistent recommendations. It emphasizes zero-knowledge encrypted document management for competitive bidding while maintaining the sophisticated gold/navy branding from its luxury real estate origins.

## The 13 Financial Categories
1. **Credit Cards** - Travel rewards, cashback, business cards, 0% APR, balance transfer, secured cards
2. **Personal Loans** - Debt consolidation, home improvement, medical, emergency funds
3. **Business Funding** - Business credit cards, lines of credit, SBA loans, startup capital
4. **Banking** - High-yield savings, checking, CDs, money market, cash management
5. **Insurance** - Auto, home, renters, life, health, umbrella, pet insurance
6. **Investing** - Brokerages, robo-advisors, retirement accounts, crypto platforms
7. **Credit Builder** - Credit-builder cards, secured cards, credit monitoring
8. **Student Finance** - Student loans, refinancing, student banking
9. **Tax Tools** - Tax filing software, professional prep, tax planning
10. **Identity & Security** - Identity protection, credit monitoring, dark web scanning
11. **Budgeting Apps** - Expense tracking, financial planning, debt payoff apps
12. **Rewards & Cashback** - Shopping cashback, receipt scanning, browser extensions
13. **Real Estate Concierge** - Luxury homes, mortgage pre-approval, home valuations (NYC, California, Nevada markets)

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
The platform features a visual-first approach with large imagery (AI Engine visualization), a gold-accented color scheme (#d4af37), and a three-tier typography system. It includes a custom theme provider for light/dark mode, glassmorphism elements, and enhanced product card styling. Key UI components include a multi-category AI chat assistant, category pages with product comparison grids, and a Global Market Ticker in the footer.

**Design Standards (November 2025):**
- **Zero Emoji Policy**: All visual indicators use Lucide React SVG icons exclusively. No emojis permitted in UI, forms, chat prompts, or notifications. Exception: Top hat in logo/branding only.
- **Header Branding**: Features "AGENT KAMMER" with tagline "When Brokers Compete You Win" in gold (#d4af37).
- **Icon System**: Professional SVG icons from lucide-react library throughout the application.
- **Text Legibility**: Dark navy/slate backgrounds ensure optimal contrast for gold and white text.
- **AI Engine Visual**: Prominent futuristic brain/circuit image in hero section representing the AI comparison engine.

### Technical Implementations
The frontend uses React, TypeScript, and Vite, with `wouter` for routing and React Query for server state management. `shadcn/ui` provides customizable components styled with Tailwind CSS. The backend is built with Express.js, Node.js, and TypeScript, providing RESTful API routes. Session management is handled via `connect-pg-simple` with PostgreSQL. OpenAI integration powers the multi-category chat assistant for lead extraction.

### Feature Specifications
- **Category Pages**: Dedicated pages for each of the 13 financial categories with AI-ranked product comparisons.
- **Product Comparison Engine**: Deterministic scoring algorithm in `shared/productOffers.ts` that calculates match scores based on user profiles.
- **AI Chat Assistant**: GPT-4o-mini powered, "Sophisticated Closer" personality, understands all 13 categories, persistent lead capture (Name, Category Interest, Timeline, Goals/Budget, Email, Phone), automatic `LEAD_DATA` JSON extraction, session tracking, database persistence with lead scores.
- **Affiliate Program**: Full affiliate tracking system with signup, referral codes, tier-based commissions, and dashboard at `/affiliates`.
- **Global Market Ticker**: Real-time ticker in footer showing S&P 500, Bitcoin, Gold, and mortgage rate data.
- **Market Analysis Reports**: On-demand property-specific reports for California, NYC, and Nevada, with downloadable PDF versions.
- **Strategic Document Portal**: Zero-knowledge encrypted document management with AES-256 client-side encryption.
- **Transformational Alignment Coaching**: Dedicated page for coaching services.
- **Luxury Travel Experiences**: Showcasing bespoke adventure packages.
- **Wellness Shop**: E-commerce for premium supplements.
- **Commercial Real Estate Investment**: Live-updating feed page for California properties.
- **Audiobooks Page**: Premium library of 9 audiobooks with unique AI-generated artwork.
- **Ecourses Page**: Premium online courses for professionals.
- **Downloads Page**: Library of free downloadable resources and templates.
- **Content Studio (Internal)**: Private management system for social media video content workflow.

### Key Files
- `client/src/pages/Home.tsx` - Homepage with AI engine image and category grid
- `client/src/pages/CategoryPage.tsx` - Unified category page template for all 13 categories
- `client/src/pages/AffiliateProgram.tsx` - Affiliate signup, tracking, and dashboard
- `shared/productOffers.ts` - Product offers database and deterministic scoring algorithm
- `shared/schema.ts` - Database schema including affiliates table
- `server/routes.ts` - API routes including affiliate endpoints and multi-category chatbot prompt
- `client/src/components/Footer.tsx` - Footer with Global Market Ticker and Affiliates link
- `client/src/components/GlobalMarketTicker.tsx` - Real-time market data ticker

### System Design Choices
The system uses Drizzle ORM with neon-http for PostgreSQL connections. Authentication is session-based. The database schema includes `users`, `leads`, `contentItems`, and `affiliates`. Product scoring uses a deterministic algorithm from the shared module for consistent UX. The platform is designed for scalability with affiliate tracking ready for Impact, FlexOffers, RevOffers, CJ, and Rakuten integration.

## External Dependencies

### Database & ORM
*   **Neon Database**: Serverless PostgreSQL provider.
*   **Drizzle ORM**: Type-safe ORM for PostgreSQL.

### APIs & Integrations
*   **OpenAI**: For AI chat capabilities (via Replit AI Integrations).
*   **API Ninjas**: (Optional) For live mortgage rate data.
*   **Google Maps**: For the Live Deal Map.
*   **RentCast API**: For property valuations (requires activation).

### Third-Party UI Libraries
*   **Radix UI**: Accessible UI primitives.
*   **Embla Carousel**: For horizontal galleries.
*   **React Hook Form**: Form state management with Zod validation.
*   **Lucide React & React Icons**: Icon libraries.

## Recent Changes (November 2025)
- Transformed from luxury real estate platform to comprehensive financial comparison engine
- Expanded to 16 financial product categories (6 Primary + 4 Secondary + 5 Supporting + 1 Flagship)
- Added new categories: Estate Planning, Renters Insurance, Cashback Apps, Credit Builder Apps, Micro-Investing, Budgeting/Subscription Trackers
- Created User Dashboard (/dashboard) with Quick Wins section and organized category navigation
- Updated chatbot to understand all 16 categories with category-specific conversation starters
- Added mobile navigation: up/down arrow buttons for quick page scrolling
- Reorganized navigation: Free Tools moved to header Compare dropdown, Dashboard link added
- Implemented deterministic scoring algorithm for consistent product recommendations
- Built complete affiliate program infrastructure with tracking and dashboard
- Incorporated AI engine visual (futuristic brain/circuit design) into homepage hero
- Added Global Market Ticker and Affiliates link to footer
