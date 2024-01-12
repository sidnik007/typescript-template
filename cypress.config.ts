import { defineConfig } from "cypress";

import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

import {addCucumberPreprocessorPlugin} from "@badeball/cypress-cucumber-preprocessor";

const createEsbuildPlugin =
    require("@badeball/cypress-cucumber-preprocessor/esbuild").createEsbuildPlugin;

module.exports = defineConfig({
    e2e: {
        async setupNodeEvents(on, config) {
            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            });

            on("file:preprocessor", bundler);
            await addCucumberPreprocessorPlugin(on, config);

            return config;
        },
        specPattern: "cypress/e2e/features/*.feature",
        baseUrl: "http://localhost:8080",
        chromeWebSecurity: false,
    },
});