const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'pulse': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      colors: {
        'app-blue': '#4F46E5', // Kronos Indigo
      }
    },
  },
  darkMode: "class",
  plugins: [
    require('@tailwindcss/typography'),
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#09090B", // Kronos Deep Space
            foreground: "#FAFAFA",
            primary: {
              DEFAULT: "#4F46E5",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#27272A", // Zinc 800
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#10B981", // Emerald 500
              foreground: "#FFFFFF",
            },
            warning: {
              DEFAULT: "#F59E0B", // Amber 500
              foreground: "#FFFFFF",
            },
            danger: {
              DEFAULT: "#EF4444", // Red 500
              foreground: "#FFFFFF",
            },
            focus: "#4F46E5",
            content1: "#18181B", // Zinc 900
            content2: "#27272A", // Zinc 800
            content3: "#3F3F46", // Zinc 700
            content4: "#52525B", // Zinc 600
            divider: "#27272A",
            overlay: "#09090B80",
            border: "#27272A",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
}
