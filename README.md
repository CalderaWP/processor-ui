# caldera-api-client
Description of package

[![Build Status](https://travis-ci.org/calderawp/caldera-npm-module-boilerplate.svg?branch=master)](https://travis-ci.org/calderawp/caldera-npm-module-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/calderawp/caldera-npm-module-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/calderawp/caldera-npm-module-boilerplate?branch=master)

🌋 👀 [Documentation](https://calderalabs.org/caldera-npm-module-boilerplate/)

### Usage
Example of how to use module:

```js
import * as calderaWhatever from '@caldera-labs/caldera-npm-module-boilerplate';
console.log( calderaWhatever.hiRoy() );
```

See: [http://calderalabs.org/caldera-npm-module-boilerplate/manual/overview.html#usage](http://calderalabs.org/caldera-npm-module-boilerplatw/manual/overview.html#usage)

## Install
`npm i -D @caldera-labs/caldera-npm-module-boilerplate`

### Development Requirements
* [npm](https://www.npmjs.com/get-npm)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
* [Git]()
* [Flow](https://flow.org/en/docs/install/)


## Testing

We use [Facebook Jest](https://facebook.github.io/jest/) for unit tests. Test go in the directory `__tests__`.

* Run test watcher
```
yarn test
```

## Scripts

### Build for release
* `yarn build`
    - Runs tests, and flow type checks and Babel compiles with minification and source map.

This script calls a pre, compile, and post subcommands.  For consistency, please call other scripts at those three events.

### Tests
* `yarn test`
    - Run test watcher
* `yarn test:once` 
    - Run tests once


### Lint Code
* `yarn lint`
    - Run linter and fixer watch
* `yarn lint:fix`
    - Lint and fix code once
* `yarn lint:once`
    - Lint code once


### Generate Documentation
* `npm run documentation`
    - Generates documentation from inline docs
    - Generates documentation from markdown files in /manual

### Release To npm
Must be [logged in as project maintainer via npm cli](https://docs.npmjs.com/cli/adduser)

* `yarn release`