/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*{.tsx, .html}'],
  theme: {
    extend: {
      backgroundImage: {
        galaxy: "url('/Bg.png')",
        'title-gradient':
          'linear-gradient(220deg, #9572fC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)',
        'game-gradient':
          'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
        'box-gradient':
          'linear-gradient(185deg, #9572fC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)'
      }
    }
  },
  plugins: []
}
