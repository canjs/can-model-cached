# can-model-cached

[![Greenkeeper badge](https://badges.greenkeeper.io/canjs/can-model-cached.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/canjs/can-model-cached.png?branch=master)](https://travis-ci.org/canjs/can-model-cached)

Cache models

## Usage

### ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```js
import plugin from 'can-model-cached';
```

### CommonJS use

Use `require` to load `can-model-cached` and everything else
needed to create a template that uses `can-model-cached`:

```js
var plugin = require("can-model-cached");
```

## AMD use

Configure the `can` and `jquery` paths and the `can-model-cached` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    paths: {
	        "jquery": "node_modules/jquery/dist/jquery",
	        "can": "node_modules/canjs/dist/amd/can"
	    },
	    packages: [{
		    	name: 'can-model-cached',
		    	location: 'node_modules/can-model-cached/dist/amd',
		    	main: 'lib/can-model-cached'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

### Standalone use

Load the `global` version of the plugin:

```html
<script src='./node_modules/can-model-cached/dist/global/can-model-cached.js'></script>
```

## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
