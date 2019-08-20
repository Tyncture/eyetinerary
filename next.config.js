const withSass = require("@zeit/next-sass");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

// Load .env file
dotenvLoad();
const withNextEnv = nextEnv({
  publicPrefix: "EYET_",
});

// Workaround for https://github.com/zeit/next-plugins/issues/392
function workaroundNextPluginsIssue392(config) {
  console.warn(
    "WARN: USING WORKAROUND FOR zeit/next-plugins/issues/392 (next.config.js)",
  );
  config.module.rules.forEach(rule => {
    // Credit to github.com/marcusstenbeck
    // Source: https://github.com/zeit/next-plugins/issues/392#issuecomment-475845330
    if (Array.isArray(rule.use)) {
      rule.use.forEach(use => {
        if (use.loader === "css-loader" && use.options) {
          delete use.options.minimize;
        }
      });
    }
  });
}

//

module.exports = withNextEnv(
  withSass({
    webpack: config => {
      workaroundNextPluginsIssue392(config);
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      });
      return config;
    },
    env: {
      "EYET_API": process.env.EYET_API,
    }
  }),
);
