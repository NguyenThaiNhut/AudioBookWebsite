module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'tiny': '400px',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-focus', 'group1-hover'],
      opacity: ['group-focus', 'group1-hover'],
      inset: ['group-focus', 'group1-hover']
    },
  },
  plugins: [
    require("tailwindcss-scoped-groups")({
      group: ["one", "two"],
    }),
  ],
}