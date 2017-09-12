import path from 'path';

const webpackConfig = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname),
    filename: 'index.js',
    library: 'markdownItPlusImage',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['babel-loader']
      }
    ]
  }
};

export default webpackConfig;
