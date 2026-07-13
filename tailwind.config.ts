import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        18: "4.5rem",
        30: "7.5rem", /* 120px section */
        40: "10rem", /* 160px section */
      },
      maxWidth: {
        site: "90rem", /* 1440px viewport cap */
        content: "80rem", /* 1280px */
        reading: "42.5rem", /* 680px */
      },
      borderRadius: {
        brand: "8px",
        button: "8px",
        card: "10px",
        image: "12px",
        lg: "10px",
        md: "8px",
        sm: "6px",
      },
      fontSize: {
        "display-1": ["5rem", { lineHeight: "0.95", fontWeight: "500" }],
        "display-2": ["3rem", { lineHeight: "1.05", fontWeight: "500" }],
        "display-3": ["2rem", { lineHeight: "1.12", fontWeight: "500" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        nav: ["0.8125rem", { lineHeight: "1", fontWeight: "600" }],
      },
      letterSpacing: {
        nav: "0.12em",
      },
      transitionDuration: {
        brand: "200ms",
      },
      transitionTimingFunction: {
        "brand-out": "cubic-bezier(0, 0, 0.2, 1)",
      },
      colors: {
        brand: {
          ink: "#20242B",
          navy: "#2A3447",
          midnight: "#202735",
          charcoal: "#2C3138",
          "navy-secondary": "#3F4B59",
          ivory: "#F5F2EB",
          surface: "#F5F2EB",
          beige: "#F5F2EB",
          warm: "#F5F2EB",
          graphite: "#2C3138",
          border: "#D8D1C7",
          stone: "#D8D1C7",
          gold: "#B08D57",
          brass: "#B08D57",
          success: "#2F6B4F",
          error: "#B42318",
          /* legacy aliases */
          accent: "#16233A",
          sapphire: "#16233A",
          champagne: "#B08D57",
          "hero-champagne": "#F5F2EB",
          "champagne-dark": "#16233A",
          steel: "#5D6674",
        },
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          border: "hsl(var(--card-border) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          border: "hsl(var(--popover-border) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          border: "var(--destructive-border)",
        },
        ring: "hsl(var(--ring) / <alpha-value>)",
        chart: {
          "1": "hsl(var(--chart-1) / <alpha-value>)",
          "2": "hsl(var(--chart-2) / <alpha-value>)",
          "3": "hsl(var(--chart-3) / <alpha-value>)",
          "4": "hsl(var(--chart-4) / <alpha-value>)",
          "5": "hsl(var(--chart-5) / <alpha-value>)",
        },
        sidebar: {
          ring: "hsl(var(--sidebar-ring) / <alpha-value>)",
          DEFAULT: "hsl(var(--sidebar) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-foreground) / <alpha-value>)",
          border: "hsl(var(--sidebar-border) / <alpha-value>)",
        },
        "sidebar-primary": {
          DEFAULT: "hsl(var(--sidebar-primary) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-primary-foreground) / <alpha-value>)",
          border: "var(--sidebar-primary-border)",
        },
        "sidebar-accent": {
          DEFAULT: "hsl(var(--sidebar-accent) / <alpha-value>)",
          foreground: "hsl(var(--sidebar-accent-foreground) / <alpha-value>)",
          border: "var(--sidebar-accent-border)",
        },
        status: {
          online: "rgb(34 197 94)",
          away: "rgb(245 158 11)",
          busy: "rgb(239 68 68)",
          offline: "rgb(156 163 175)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-display)"],
        display: ["var(--font-display)"],
        script: ["var(--font-script)"],
        mono: ["var(--font-mono)"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(17, 17, 17, 0.04)",
        none: "none",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.22s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
