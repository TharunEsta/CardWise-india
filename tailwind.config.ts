import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      fontFamily: {
        sans: ["var(--font-manrope)"],
        display: ["var(--font-space-grotesk)"]
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(88,166,255,.18), transparent 30%), linear-gradient(180deg, rgba(255,255,255,.04), transparent), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px)"
      },
      boxShadow: {
        premium: "0 30px 90px rgba(18, 26, 43, 0.55)",
        glow: "0 0 120px rgba(67, 170, 255, 0.24)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        aurora: "aurora 18s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
