const { fontFamily } = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./content/blog/**/*.mdx",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        thumbnail:
          "0 0 0 0.5px #e2e8f0, 0 0 0 1px rgba(226, 232, 240, 0.5), 0 0 0 3px #f8fafc, 0 0 0 3.5px #f1f5f9, 0 10px 15px -3px rgb(59 130 246/5%), 0 4px 6px -4px rgb(59 130 246/5%)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        mono: ["var(--font-code)", ...fontFamily.mono],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      keyframes: ({ theme }) => ({
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        emoji: {
          "0%": {
            opacity: "0",
            transform: "translateY(0) scale(0)",
          },
          "50%": {
            opacity: "1",
            transform: "translateY(-40px) scale(1)",
          },
          to: {
            opacity: "0",
            transform: "translateY(-60px) scale(1.4)",
          },
        },
        loading: {
          "0%": {
            opacity: ".2",
          },
          "20%": {
            opacity: "1",
            transform: "translateX(1px)",
          },
          to: {
            opacity: ".2",
          },
        },
        mutation: {
          "0%": {
            background: theme("colors.rose.200 / 3%"),
          },
          "10%": {
            background: theme("colors.rose.200 / 15%"),
            color: theme("colors.rose.200 / 75%"),
          },
          "100%": {
            background: theme("colors.rose.200 / 0%"),
          },
        },
        reveal: {
          "0%": {
            opacity: 0,
            filter: "brightness(1) blur(15px)",
            scale: "1.0125",
          },
          "10%": { opacity: 1, filter: "brightness(1.25) blur(10px)" },
          "100%": { opacity: 1, filter: "brightness(1) blur(0)", scale: "1" },
        },
      }),
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        reveal: "reveal 0.7s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}
