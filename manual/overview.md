# Caldera Whatever API

## Documentation Of the Example Module
This is a guide for documenting how to use your actual module.

### `sayHi`

```js
//Say Hi to Roy
console.log(sayHi()); //Hi Roy
```


```js
//Say Hi to Someone else
console.log(sayHi('Mike')); //Hi Mike
```


## Using This Boilerplate

### Enable Github Pages For Docs

Go to Settings in Github repo.

Enable Github pages for master branch /docs dir
<a href="https://ibb.co/bTSUv8"><img src="https://preview.ibb.co/hsXwa8/Screen_Shot_2018_06_09_at_3_41_30_PM.png" alt="Screen_Shot_2018_06_09_at_3_41_30_PM" border="0"></a>


### Adding State Management

### Using For React Components

### Creating Exports
This boilerplate compiles code with babel to the `/dist` directory. One or more module exports must be created and identified in package.json.

For example:
```json
{
"main": "./dist/index.js",
  "files" : [
      "./dist/index.js",
      "./dist/fields/index.js",
      "./dist/fields/factories/index.js"
  ]
}
```

See:
* https://docs.npmjs.com/files/package.json#files
* https://docs.npmjs.com/files/package.json#main

### Publishing To NPM
All Caldera libraries should be published as [org scoped packages](https://www.npmjs.com/docs/orgs/publishing-an-org-scoped-package.html) in the [@caldera-labs](https://www.npmjs.com/search?q=%40caldera-labs) organization.

Short version of [the docs](https://www.npmjs.com/docs/orgs/publishing-an-org-scoped-package.html)

Make sure in package.json:

* That `private` is not set to true.
* That the name of the package is `@caldera-labs/processor-ui` where `whatever` describes the modules job. For example, `@caldera-labs/mailchimp-client` if you're building a Mailchimp client. Note that "caldera" was not used on the right side of the slash.
* That you have specified at least one entry point and defined a module export for it.
* You have authorization to publish in `@caldera-labs` org scope.
* You are logged in as that user via the npm cli
    - https://docs.npmjs.com/cli/adduser

Once you're ready to publish, commit everything and do the first release manually:

`npm publish`

After that, the documented scripts for automated update publishing apply for future updates.