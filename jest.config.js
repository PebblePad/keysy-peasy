module.exports = {
    roots: [
        "<rootDir>/src",
    ],
    transform: {
        "^.+\\.(js|ts)?$": "ts-jest",
    },
    testRegex: ".*(test|spec)\\.(ts)?$",
    moduleFileExtensions: [
        "js",
        "json",
        "ts",
    ],
    testEnvironment: "jsdom",
    globals: {
        "ts-jest": {
            tsconfig: "./jest-tsconfig.json",
            preset: "js-with-ts",
            isolatedModules: true,
            diagnostics: false,
        },
    },
    preset: "ts-jest/presets/js-with-ts",
}