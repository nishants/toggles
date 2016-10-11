#Toggles

## Installation

- Install with bower
```bash
bower install toggles --save
```

- Include lib/toggles.js
```html
<script src="bower_components/toggles/lib/toggles.js"></script>
```

- Create configuration file at path [config/features.json](https://raw.githubusercontent.com/nishants/toggles/master/demo/config/features.json)
```javascript
{
  "default": {
    "features"  : {
      "feature-one-name" : false,
      "feature-two-name" : false
    }
  },

  "regression": {
    "url"      : "<regression-server-host>",
    "features" : {
      "feature-one-name"  : true,
      "feature-two-name"  : false
    }
  },

  "dev": {
    "url"      : "localhost",
    "features" : {
      "feature-one-name"  : true,
      "feature-two-name"  : true
    }
  }
}
```

- Bind features with elements in html
```html
  <div feature="feature-one-name">
      <h1>Feature One</h1>
  </div>

  <div feature="feature-two-name">
      <h1>Feature Two</h1>
  </div>
```

- if a feature is turned off, all elements associated with it will be removed from DOM.


## Default Configuration
- By default it expects configuration file at relative path : [config/features.json](https://raw.githubusercontent.com/nishants/toggles/master/demo/config/features.json)
- Be default all features are enabled
- To disable a feature use feature.json


## Environments
- Environment is deduced from the host name in [config/features.json](https://raw.githubusercontent.com/nishants/toggles/master/demo/config/features.json).
- If hostname is not configured, default env is used.
- It is recommended to not add host for production, use default env for production.

## Set Configuration from HTTP API
- to use configuration from a server.invoke **toggles.init** with promise returning a json like [config/features.json](https://raw.githubusercontent.com/nishants/toggles/master/demo/config/features.json)
```javascript
    app.run(['$http', 'toggles', function ($http, toggles) {
        toggles.init($http.get("config/features").then(function(response){
            return response.data;
        }));
    }]);
```