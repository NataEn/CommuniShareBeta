module.exports={
    module:{
        rules: [
            {
                // reggular espression: for any js
                test:/\.js$/,
                exclude: /node_modules/,
                use:{
                    // use babel to transpile the code
                    loader: "babel-loader"
                }
            }
        ]
    },
    devtool: 'inline-source-map'
}