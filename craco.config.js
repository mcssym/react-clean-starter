const path = require('path');
module.exports = {
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            // console.log(webpackConfig);
            return webpackConfig;
        },
        alias: {
            '@presentation': path.resolve(__dirname, 'src/presentation'),
            '@ui': path.resolve(__dirname, 'src/presentation/ui'),
            '@domain': path.resolve(__dirname, 'src/domain'),
            '@data': path.resolve(__dirname, 'src/data'),
            '@endpoints': path.resolve(__dirname, 'src/data/resources/remote/http/endpoints'),
            '@gateways': path.resolve(__dirname, 'src/data/resources/remote/ws/gateways'),
            '@application': path.resolve(__dirname, 'src/application'),
            '@services': path.resolve(__dirname, 'src/application/services'),
            '@controllers': path.resolve(__dirname, 'src/application/controllers'),
            '@managers': path.resolve(__dirname, 'src/application/managers'),
            '@use_cases': path.resolve(__dirname, 'src/domain/use_cases'),
            '@foundation': path.resolve(__dirname, 'src/foundation')
        },
    },
    babel: {
        plugins: [
            "babel-plugin-transform-typescript-metadata",
            [
                "@babel/plugin-proposal-decorators",
                {
                    "legacy": true
                }
            ],
            [
                "@babel/plugin-proposal-class-properties",
                {
                    "loose": true
                }
            ]
        ],
        presets: ["@babel/preset-typescript", "@babel/preset-env"]
    }
};