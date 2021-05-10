const presets = [
    [
        "@babel/preset-env",
        {
            "modules": false,
            "targets": {
                "browsers": [
                    "Chrome >= 59",
                    "FireFox >= 60",
                    "Safari >= 11.1",
                    "IE >= 11",
                    "Edge >= 17"
                ]
            },
            "useBuiltIns": "usage",
            "corejs": 3
        }
    ],
    "@babel/preset-react",
    "@babel/preset-typescript"
];

const plugins = [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties"
];

module.exports = { plugins, presets };
