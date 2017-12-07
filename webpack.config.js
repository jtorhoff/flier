/* Copyright (c) 2017 Juri Torhoff
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader?configFileName=tsconfig.json" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },

                    {
                        loader: "css-loader",
                        options: {
                            minimize: true,
                            discardComments: {
                                removeAll: true
                            }
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version),
            DEBUG: process.argv.indexOf("--p") === -1,
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                worker: {
                    output: {
                        filename: "worker.js",
                        chunkFilename: "[id].worker.js"
                    }
                }
            }
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: "index.html",
            template: "./src/templates/index.html",
            files: {
                js: ["bundle.js"],
            }
        }),
    ],

    // To prevent "Module not found: Error: Can't resolve 'fs' in 'webp'"
    node: {
        fs: "empty",
    },
};