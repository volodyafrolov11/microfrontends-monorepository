import webpack from 'webpack';
import path from "path";
import {BuildMode, BuildPaths, BuildPlatform, buildWebpack} from "@packages/build-config";
import packageJson from './package.json';

interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    bundleAnalyzer?: boolean;
    platform?: BuildPlatform;
    babelLoader?: boolean;
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3002,
        mode: env.mode ?? 'development',
        bundleAnalyzer: env.bundleAnalyzer || false,
        platform: env.platform ?? 'desktop',
        paths,
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'admin',
        filename: 'remoteEntry.js',
        exposes: {
            './Router': './src/router/Router.tsx',
        },
        shared: {
            ...packageJson.dependencies,
            react: {
                eager: true,
                requiredVersion: packageJson.dependencies['react'],
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom'],
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom'],
            }
        }
    }))

    return config;
}