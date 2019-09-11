const jestConfig = {
    roots: ["<rootDir>/src"],
    transform: {
        "^.+\\.(js|ts)?$": "ts-jest"
    },
    testRegex: ".*(test|spec)\\.(ts)?$",
    moduleFileExtensions: ["ts", "js", "json"],
    globals: {
        "ts-jest": {
            preset: "js-with-ts",
            isolatedModules: true,
            tsConfig: "./jest-tsconfig.json",
            diagnostics: false
        }
    },
};

module.exports = jestConfig;
