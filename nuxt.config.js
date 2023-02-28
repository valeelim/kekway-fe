require('dotenv').config()

export default {
  ssr: false,


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Kekway',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet', 
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Poppins:ital,wght@0,400;1,300&display=swap'
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuesax/dist/vuesax.css',
    'vuetify/dist/vuetify.min.css',
    'boxicons/css/boxicons.min.css',
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuesax.js', ssr: false },
    { src: '~/plugins/services.js' },
    { src: '~/plugins/vuex-persist.js', mode: 'client' },
    { src: '~/plugins/vuetify.js' },
    { src: '~/plugins/lodash.js' },
  ],

  vuetify: {
    customVariables: ["~/assets/css/variables.scss"],
    treeShake: true,
  },

  router: {
    // middleware: ['auth']
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8',

  ],

  axios: {
    baseUrl: process.env.API_BASE_URL
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/moment',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv',
  ],

  moment: {
    defaultTimeZone: 'Asia/Jakarta',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'defu'
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  components: [
    {
      path: '~/components',
      prefix: false,
    }
  ],
  
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME
  },

  // Auth Config: https://auth.nuxtjs.org
  auth: {
    redirect: false,
    strategies: {
      local: {
        token: {
          property: 'access',
          type: 'JWT',
          maxAge: 1800,
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'auth/jwt/create/',
            method: 'post',
            property: 'access',
          },
          refresh: {
            url: 'auth/jwt/refresh/',
            method: 'post',
          },
          logout: false,
          user: {
            url: 'account/me/',
            method: 'get',
            property: false,
          },
        }
      }
    }
  }
}
