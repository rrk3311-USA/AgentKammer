# Agent Kammer - NYC Real Estate Platform Design Guidelines

## Design Approach

**Selected Approach:** Reference-Based Design inspired by premium real estate platforms (Compass, Sotheby's International Realty) combined with Airbnb's search-focused UX patterns.

**Rationale:** Real estate is inherently visual and experience-driven. Users make emotional, high-value decisions requiring sophisticated presentation, trust-building through professional aesthetics, and intuitive property discovery.

**Key Design Principles:**
- Premium sophistication matching the Agent Kammer brand identity
- Visual-first property presentation with large, high-quality imagery
- Effortless search and filter experience
- Trust through professional polish and attention to detail

---

## Typography System

**Primary Font:** Playfair Display (serif) - for headlines, property titles, and brand moments
- H1: 4xl to 6xl, font-semibold (hero headlines, page titles)
- H2: 3xl to 4xl, font-semibold (section headers)
- H3: 2xl, font-medium (property titles, card headers)

**Secondary Font:** Inter (sans-serif) - for body text, UI elements, data
- Body Large: text-lg, font-normal (property descriptions, feature text)
- Body: text-base, font-normal (standard content)
- Small: text-sm, font-normal (metadata, labels)
- Tiny: text-xs, font-medium (badges, tags)

**Accent Usage:**
- Property prices: Playfair Display, text-2xl to 3xl, font-semibold
- CTA buttons: Inter, text-base, font-semibold, uppercase tracking-wide
- Navigation: Inter, text-sm, font-medium

---

## Layout System

**Container Strategy:**
- Full-width hero: w-full with inner max-w-7xl mx-auto px-6 lg:px-8
- Content sections: max-w-6xl mx-auto px-6
- Property grids: max-w-7xl mx-auto px-6

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24
- Component internal padding: p-4 to p-8
- Section vertical spacing: py-12 md:py-20 lg:py-24
- Card gaps: gap-6 to gap-8
- Element spacing: space-y-4 to space-y-6

**Grid Patterns:**
- Property listings: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Feature highlights: grid-cols-1 md:grid-cols-3 gap-6
- Property details: grid-cols-1 lg:grid-cols-3 gap-12 (2 cols content, 1 col sidebar)

**Vertical Rhythm:**
- Hero section: min-h-[600px] lg:min-h-[700px]
- Content sections: Natural height with py-16 to py-24
- Property cards: Natural height based on content

---

## Component Library

### Navigation
- Fixed header with backdrop-blur-lg for scroll transparency effect
- Logo placement: left-aligned with h-12 dimensions
- Primary nav items: horizontal flex with gap-8, hidden on mobile
- Mobile: Hamburger menu triggering full-screen overlay
- Right section: "Save Search" and "Sign In" buttons with gap-4

### Hero Section - Property Search
- Full-width background treatment (not forced to 100vh)
- Centered search module with max-w-4xl
- Multi-step search form with elegant card styling:
  - Budget range slider with dual handles
  - Bedroom/bathroom selectors (pill buttons)
  - Location autocomplete with dropdown
  - Property type toggles (Condo, Co-op, Townhouse, Penthouse)
- Large primary CTA button below filters
- Subtle tagline above search: "Discover Your Perfect NYC Home"

### Property Listing Cards
- Aspect ratio 4:3 image container with rounded-xl
- Image gallery indicator (dots overlay) showing multiple photos
- Hover state: subtle scale transform-scale-105 transition
- Quick-save heart icon: absolute top-4 right-4 with backdrop-blur
- Price badge: absolute bottom-4 left-4 with backdrop-blur
- Below image stack:
  - Property title (truncate-2-lines)
  - Address with location icon
  - Meta row: beds, baths, sqft with icons and dividers
  - "View Details" link with arrow icon

### Filter Sidebar (Desktop) / Drawer (Mobile)
- Sticky positioning on desktop (top-24)
- Collapsible filter sections with chevron icons
- Range sliders for price and size
- Checkbox groups for amenities
- Applied filters display as dismissible chips above results
- "Clear All" and "Apply Filters" actions at bottom

### Property Detail Page
**Image Gallery:**
- Large primary image: aspect-[16/9] with rounded-t-2xl
- Thumbnail grid below: 4-5 images, aspect-square, rounded-lg
- Full-screen lightbox on click with navigation arrows

**Layout:**
- Two-column: main content (2/3 width) + sticky inquiry sidebar (1/3)
- Main content sections with space-y-12:
  - Property overview with price, address, key stats
  - Description with "Read More" expansion
  - Features & Amenities grid (grid-cols-2 gap-4)
  - Neighborhood insights with map embed
  - Similar properties carousel

**Inquiry Sidebar:**
- Sticky card with rounded-2xl
- Agent contact form fields:
  - Name, email, phone inputs with refined styling
  - Message textarea
  - Schedule viewing date picker
- Submit button: full-width, prominent
- Agent profile mini-card at bottom

### Dashboard - Saved Searches
- Page header with user greeting and search stats
- Saved search cards showing:
  - Search criteria summary
  - "New Listings" count badge
  - Email frequency toggle
  - Edit/Delete actions
- Create new search CTA card with dashed border

### Email Digest Preview Section
- Preview card styled as email template
- Header with Agent Kammer branding
- "Your Daily NYC Property Digest" headline
- Mini property cards (simplified versions):
  - Small image thumbnail, price, address, beds/baths
  - "View Full Listing" link
- Footer with unsubscribe and email preferences links

### Form Elements (Consistent Throughout)
- Input fields: rounded-lg, border with focus ring effect, px-4 py-3
- Labels: text-sm font-medium, mb-2
- Dropdowns: Custom styled with chevron icon
- Checkboxes/Radio: Large touch targets (h-5 w-5) with custom styling
- Range sliders: Custom track and thumb with value labels
- Error states: red accent, icon, helper text below field

### Buttons
- Primary: rounded-full, px-8 py-4, font-semibold, shadow-lg
- Secondary: rounded-full, px-6 py-3, border-2
- Ghost: transparent with hover background
- Icon buttons: rounded-full, p-3, icon-only with tooltip
- Button groups: rounded-full container with connected pills

### Data Display
- Stats cards: rounded-2xl, p-6, with icon + large number + label
- Badges: rounded-full, px-3 py-1, text-xs font-semibold
- Dividers: subtle lines with decorative elements at intersections

---

## Images

**Hero Section:**
- Large background image showing iconic NYC skyline or premium interior
- Subtle overlay to ensure search form readability
- Image should convey luxury, aspiration, and NYC sophistication

**Property Listings:**
- High-quality professional photography required for each listing
- Minimum 5 images per property
- Mix of exterior, interior, amenity spaces
- Consistent aspect ratios for grid harmony

**Additional Images:**
- Neighborhood section: map integration with property pins
- About section: NYC landmarks, neighborhood lifestyle shots
- Agent profiles: Professional headshots with rounded-full treatment

**Image Treatment:**
- All property images: rounded corners (rounded-lg to rounded-2xl)
- Hover effects: subtle zoom with smooth transitions
- Loading states: skeleton screens matching aspect ratios
- Lazy loading for performance on long property lists

---

## Animations

**Minimal, Purposeful Motion:**
- Page transitions: fade-in with slight y-axis movement
- Card hover: transform scale (1.02), shadow elevation change
- Filter drawer: slide-in from side with backdrop fade
- Modal overlays: scale from center with backdrop fade
- No scroll-triggered animations
- No parallax effects
- Focus on snappy, responsive interactions over decorative motion

---

## Page-Specific Layouts

**Home Page:**
1. Hero with integrated search (as described above)
2. Featured neighborhoods grid (3 columns, image cards with overlay text)
3. Latest luxury listings carousel
4. Platform benefits (3-column grid with icons)
5. Testimonials section (2-column with agent photos)
6. Email signup CTA with preview

**Search Results Page:**
- Filter sidebar + results grid layout
- Sort dropdown (Price, Date, Relevance)
- Map toggle view option
- Pagination with load more option

**Property Detail:**
- As described in components section
- Full-width gallery → two-column content → related properties

This design system creates a premium, trustworthy real estate platform that balances sophistication with usability, matching the Agent Kammer brand's elevated positioning in the NYC market.