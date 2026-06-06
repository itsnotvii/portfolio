/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bg: '#080808',
        surface: '#111111',
        border: '#1e1e1e',
        muted: '#444444',
        dim: '#888888',
        text: '#f0f0f0',
        accent: '#e8e0d0',
      },
    },
  },
  plugins: [],
}