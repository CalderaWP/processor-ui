# Caldera Processor UI
Caldera Forms processor user interface generator and components.

🌋 👀 [Documentation](https://calderalabs.org/caldera-npm-module-boilerplate/)

[![Build Status](https://api.travis-ci.org/CalderaWP/processor-ui.svg?branch=master)](https://travis-ci.org/CalderaWP/processor-ui);
[![Documentation Status](https://calderalabs.org/processor-ui/badge.svg)](https://calderalabs.org/processor-ui/badge.svg)

|Statements|Lines|Functions|Branches|
|---|---|---|---|
|![StatementsCoverage Status](./coverage/badge-statements.svg)|![Lines Coverage Status](./coverage/badge-lines.svg)|![Functions Coverage Status](./coverage/badge-functions.svg)|![Branches Coverage Status](./coverage/badge-branches.svg)|


## Usage

## Install
`npm i -D @caldera-labs/prcoessors-ui`

## [Complete Usage Example](https://calderalabs.org/processor-ui/manual/overview.html#example)

## Scripts
### Development Requirements
* [npm](https://www.npmjs.com/get-npm)
* [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
* [Git]()

### Develop
* `yarn start`
    - Runs linter and compiles for development
    - Starts test app server

### Build for release
This script is run as part of release commands. There is no need to run it manually most of the time.

This script calls a pre, compile, and post subcommands.  For consistency, please call other scripts at those three events.

* `yarn build`
    - Runs tests and compiles.
    

### Tests
We use [Facebook Jest](https://facebook.github.io/jest/) for unit tests. Test go in the directory `__tests__`.

* `yarn test`
    - Run test watcher
* `yarn test:once` 
    - Run tests once


### Lint Code
Code style is enforced using [eslint](https://eslint.org/)

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
    - Release a patch update
    - Increments third position of a version. 1.0.1 -> 1.0.2
* `yarn release:minor`
    - Release a minor update
    - Increments second position of a version. 1.0.1 -> 1.1.0 
* `yarn release:major`
    - Release a major update
    - Increments second position of a version. 1.0.1 -> 2.0.0 
    
These commands run the tests and linter, and if they pass, re-compiles source, rebuilds docs, updates the version using [npm version](https://docs.npmjs.com/cli/version), adds a git tag, makes a git commit for the version change and updates the module on npm.
