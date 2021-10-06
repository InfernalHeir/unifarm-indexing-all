module.exports = (api) => {
   api.cache(true);
   return {
      presets: ["@babel/preset-typescript", "@babel/preset-env"],
      plugins: [
         "@babel/plugin-transform-runtime",
         ["@babel/plugin-proposal-decorators", { legacy: true }],
         ["inline-json-import", {}]
      ],
      ignore: [
         `../node_modules`,
         "./Dockerfile",
         "../actions",
         "../cron",
         "../docker",
         "../events/ethereum-events.ts",
         "../events/db-seed",
         "../events/listeners/index.ts",
         "../graphql",
         "../helpers",
         "../scripts",
         "../storage",
         "../types",
         "../*.yml",
         "../docker.sh",
         "../index.ts",
         "../*.json",
         "../README.md",
         "../yarn.lock",
      ],
   };
};
