module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'weather',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'IP weather' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBzaWLCk6WZFC4YtQLHaeR5BgvdsWR0j64&libraries=places'
      }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  plugins: [
    {
      src: '~/plugins/gm-autocomplete',
      ssr: false
    },
    {
      src: '~/plugins/local-storage',
      ssr: false
    },
    {
      src: '~/plugins/browser-geolocation',
      ssr: false
    },
    {
      src: '~/plugins/moment',
      ssr: false
    }
  ],
  modules: [
    'bootstrap-vue/nuxt'
  ],
  loading: { color: 'red' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    API_KEY_OPENWEATHERMAP: 'c5421e881cf9db203db2ec7c7b247138'
  }
}
