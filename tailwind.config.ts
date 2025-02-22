import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray500: "#1a1a1e",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },

      backgroundImage: {
        "gray-gradient-first":
          "linear-gradient(0deg, rgba(32,32,32, 0.05) 40%, rgba(123,123,138, 0.39) 100%)",
        "gray-gradient-second":
          "linear-gradient(0deg, rgba(123,123,138, 0.39) 5%, rgba(32,32,32, 0.05) 100%)",
        "blue-gradient-first":
          "linear-gradient(0deg, rgba(15,15,16, 0.05) 0%, rgba(0,200,255,0.39) 100%)",
        "blue-gradient-second":
          "linear-gradient(0deg, #0F0F10 0%, rgba(0,200,255,0.39) 100%)",
        "blue-gradient-500":
          "linear-gradient(267deg, rgba(0,78,99,1) 0%, #00c8ff 100%)",
        "orange-gradient-500":
          "linear-gradient(267deg, rgba(153,41,0,1) 0%, #FF4500 100%)",
        "red-gradient-500": "linear-gradient(267deg, #570D0D 0%, #BD1C1C 100%)",
        "yellow-gradient-first":
          "linear-gradient(0deg, rgba(15,15,16, 0.05) 0%, rgba(255,204,0,0.39) 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
