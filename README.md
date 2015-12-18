node-nominatim2
==============

A simple wrapper for the awesome Nominatim API: http://wiki.openstreetmap.org/wiki/Nominatim

How to use it:

Require node-nominatim2

```
var Nominatim = require('node-nominatim2');
```

Instantiate an instance of Nominatim. You must provide a valid HTTP Referer or User-Agent identifying the application (stock User-Agents as set by http libraries will not do). You may also add a `timeout` option, which defaults to 2500 if not provided.

```
var options = {
  useragent: 'MyApp',
  referer: 'https://github.com/xbgmsharp/node-nominatim2',
  timeout: 1000
},
nominatim = new Nominatim(options);
```

Make a call to the API using the search method.

  The search function calls to the http://nominatim.openstreetmap.org/search/<query>?<params>

```
nominatim.search({q: "135 pilkington, avenue birmingham"}, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```

  The reverse function calls to the endpoint: http://nominatim.openstreetmap.org/reverse?<query>

```
var params = {
  lat: 52.5460941,
  lon: 13.35918
};
nominatim.reverse(params, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```

  The lookup function calls to the endpoint: http://nominatim.openstreetmap.org/lookup?<query>

```
var params = {
  osm_ids: 'R146656,W104393803,N240109189'
};
nominatim.reverse(params, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```

Additional:

Both search and reverse accept optional parameters to accommodate the optional query string params available for the nominatim API calls. The following call is, for instance, possible and will return only the current property and its child properties:

```
var params = {
  q: '',
  accept-language: 'fr'
};
forecast.search(params, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```
