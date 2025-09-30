/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        skyblue: 'var(--color-skyblue)',
        lightskyblue: 'var(--color-lightskyblue)',
        dark: 'var(--color-dark)',
        destructive: '#ef4444', // A red color for errors
      },
      fontSize: {
        'xm': 'var(--text-xm)',
        '9xl': 'var(--text-9xl)',
        '40': 'var(--text-40)',
        '52': 'var(--text-52)',
        'sm': 'var(--text-sm)',
      },
      screens: {
        'xs': '375px',
        'mobile': '520px',
      },
      spacing: {
        '45p': '45%',
        '85p': '85%',
        '90p': '90%',
        '68': '17.375rem',
        '540': '33.75rem',
        '8xl': '87.5rem',
      },
      boxShadow: {
        '3xl': 'var(--shadow-3xl)',
        'auth': 'var(--shadow-auth)',
        'dark-auth': 'var(--shadow-dark-auth)',
      },
      animation: {
        'slide': 'var(--animate-slide)',
      },
    },
  },
  plugins: [],
}
