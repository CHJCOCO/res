/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'pretendard': ['var(--font-pretendard-regular)'],
        'pretendard-bold': ['var(--font-pretendard-bold)'],
        'pretendard-semibold': ['var(--font-pretendard-semibold)'],
        'maruburi': ['var(--font-maruburi-regular)'],
        'maruburi-bold': ['var(--font-maruburi-bold)'],
        'maruburi-semibold': ['var(--font-maruburi-semibold)'],
        'jalnan': ['var(--font-jalnan-gothic)'],
        'nanum-round': ['var(--font-nanum-square-round)'],
        'seoyun': ['var(--font-lee-seoyun)'],
        'kotra': ['var(--font-kotra-bold)'],
        'nanum-barun': ['var(--font-nanum-barun-gothic)'],
        'dancingscript': ['var(--font-dancingscript-regular)'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
      animationDelay: {
        '200': '0.2s',
        '400': '0.4s',
        '600': '0.6s',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
        '110': '1.10',
        '125': '1.25',
      },
      height: {
        '192': '48rem',
      }
    },
  },
  plugins: [],
} 