import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {DefinePlugin} from 'webpack';
// import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
// import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const isDev = options.mode === "development";

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: options.paths.html,
            favicon: path.resolve(options.paths.public, 'favicon.ico'),
            publicPath: '/'
        }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(options.platform),
        }),
    ]

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin())
        // plugins.push(new ForkTsCheckerWebpackPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    if(!isDev) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
        options.bundleAnalyzer && plugins.push(new BundleAnalyzerPlugin())
        // plugins.push(new CopyPlugin({
        //     patterns: [],
        // }))
    }

    return plugins;
}