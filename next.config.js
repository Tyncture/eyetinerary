// As per https://github.com/zeit/next-plugins/tree/master/packages/next-typescript
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');

// Load .env file
dotenvLoad();
const withNextEnv = nextEnv({
  publicPrefix: "EYET_"
});

module.exports = withNextEnv(
  withTypescript(
    withSass({
    })
  )
)