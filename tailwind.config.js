/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-pattern': "url('/wave.svg')",
        flury: "url('/ffflurry.svg')",
      },
      colors: {
        primary: '#146C94',
        abu: '#F6F1F1',
        abu2: '#f4f4f4',
        abubgt: '#646464',
        kuning: '#F4E869',
        hijau: '#146C50',
        abu1: '#EEEEEE',
      },
    },
  },
  plugins: [],
};
