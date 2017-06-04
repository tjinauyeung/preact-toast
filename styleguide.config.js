module.exports = {
  webpackConfig: {
    resolve: {
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      }
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
          	presets: ['es2015'],
          	plugins: [
              ["transform-react-jsx", { "pragma": "h" }]
            ]
          }
        }
      ]
    }
  },
  defaultExample: true,
  components: 'src/components/**/*.jsx'
};