import { join } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Google Sans', 'Arial', 'Helvetica', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'bg-light': 'var(--color-bg-light)',
        'bg-dark': 'var(--color-bg-dark)',
        surface: 'var(--color-surface)',
        'text-dark': 'var(--color-text-dark)',
        'text-light': 'var(--color-text-light)',
        border: 'var(--color-border)',
      },
      borderRadius: {
        md: '0.5rem',
        lg: '0.75rem',
      },
      padding: {
        '4': '1rem',
        '6': '1.5rem',
      },
    },
  },
  plugins: [],
}; 