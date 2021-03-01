/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/' },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-postcss',
    '@snowpack/plugin-webpack',
  ],
  alias: {
    '@app': './src',
    '@appTypes': './types',
  },
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
  packageOptions: {
    types: true,
  },
  devOptions: {
    port: 8080,
  },
  buildOptions: {
    out: 'dist',
    sourcemap: true,
  },
}
