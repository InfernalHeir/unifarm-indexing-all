module.exports = (api) => {
	api.cache(true)
	return {
    presets: [
      "@babel/preset-typescript", "@babel/preset-env"
    ],
    plugins:[
      "@babel/plugin-transform-runtime",
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ],
		ignore: [
			"../node_modules",
      "./Dockerfile",
      "../actions",
      "../constants",
      "../commands",
      "../cron",
      "../docker",
      "../events",
      "../helpers",
      "../providers",
      "../scripts",
      "../storage",
      "../types",
      "../command.yml",
      "../docker-compose.yml",
      "../docker.sh",
      "../index.ts",
      "../package.json",
      "../README.md",
      "../tsconfig.json",
      "../yarn.lock"
		]
	}
}
