module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-ssr-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  https: true,
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  plugins: [
    '~plugins/axios',
    { src: '~plugins/toast', ssr: false }
    // '~plugins/toast'
  ],
  axios: {
    // baseURL:'', // 线上统一基础url
    proxy: true,
    prefix: '/api', // 表示给请求url加个前缀 /api
  },
  proxy: {
    '/api': {
      target: 'https://api.apiopen.top/',
      pathRewrite: {
        '^/api': '/', // 把 /api 替换成 /
        changeOrigin: true // 表示是否跨域
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['axios'],
    // postcss:[
    //   require('postcss-px2rem')({
    //     remUnit: 75
    //   })
    // ]
  }
}

