module.exports = {
  darkMode: 'class', // or 'media' or 'false'
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  variants: {
    extend: {
        display: ["group-hover"],
    },
},

  theme: {
    extend: {
      colors: {
        themeBackground: 'var(--background)',
        themeText: 'var(--text)',
      },
      keyframes: {
        showUp: {
          '0%': { transform: 'translateY(50px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        hideDown: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(50px)' },
        },
        hideDownNavbar: {
          '0%': { transform: 'translateY(0rem)' },
          '100%': { transform: 'translateY(25rem)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        spinBack: {
          '0%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }

      },
      animation: {
        showUp: 'showUp 0.2s linear',
        hideDownNavbar: 'hideDownNavbar 0.4s linear',
        showUpNavbar: 'hideDownNavbar 0.4s linear',
        spinOnce: 'spin 1s forwards',
        spinOnceBack: 'spinBack 1s forwards',
      }
    },
    fontFamily: {
      brown: ["BROWN", "sans-serif"],
      itim: ["ITIM", "sans-serif"],
      intern: ["INTERN", "sans-serif"],
      roboto: ["ROBOTO", "sans-serif"],
      robotolight: ["ROBOTOLIGHT", "sans-serif"],
      montserrat: ["MONTSERRAT", "sans-serif"],
      elmessiri: ['ELMESSIRI', "sans-serif"],
      publicsans: ["PublicSans", "sans-serif"],
      righteous: ["RIGHTEOUS", "regular"],
      flamabook: ["FLAMABOOK", "regular"],
      mulish: ["Mulish", "regular"],
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1330px',
      // => @media (min-width: 1330px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
}