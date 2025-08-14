import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/FrontPage/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
        },
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        success: 'var(--success)',
        nature: {
          10: 'var(--nature-10)',
          99: 'var(--nature-99)',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-space-grotesk)',
          'var(--font-noto-sans-tc)',
          'system-ui',
          'sans-serif',
        ],
        chinese: ['var(--font-noto-sans-tc)', 'system-ui', 'sans-serif'],
        english: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'media',
};
export default config;
