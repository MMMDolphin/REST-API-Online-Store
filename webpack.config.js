// webpack.config.js
const path = require('path');

module.exports = {
    entry: './client/index.js',  // Entry point for your React app
    output: {
        path: path.join(__dirname, 'public'),  // Output to 'public' directory
        filename: 'bundle.js'  // Bundled file
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    mode: 'development'
};
