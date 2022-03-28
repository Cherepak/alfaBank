const path = require("path");

module.exports = {
    mode: "development",
    entry: ['babel-polyfill',"./app.js"],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"), 
    },
    watch:true,
    module: {
        rules: [
            {test: /\.react$/, use: "react"},
            {test: /\.react-dom$/, use : "react-dom"},
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env','@babel/preset-react']
                  }
                }
            },
            
        ]
    }

}