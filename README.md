node-nominatim2
==============

A simple wrapper for the awesome Nominatim API: http://wiki.openstreetmap.org/wiki/Nominatim

General
--------

Node.js module for geocoding and reverse geocoding and lookup.
[**Uses service OpenStreetMap geocoding API (Nominatim tool)**](http://wiki.openstreetmap.org/wiki/Nominatim).

Geocoding is the process of matching address with geographic coordinates.
Reverse Geocoding is the process of matching geographic coordinates with address.

[*Address geocoding*](http://wiki.openstreetmap.org/wiki/Nominatim#Search).
Provide an address or location and receive potential OSM geocodes.

[*Reverse geocoding*](http://wiki.openstreetmap.org/wiki/Nominatim#ReverseSearch).
Provide latitude and longitude coordinates and receive the known address information for that location.

[*Address lookup*](http://wiki.openstreetmap.org/wiki/Nominatim#Address_lookup).
Lookup the address of one or multiple OSM objects like node, way or relation.

[Usage Limits](http://wiki.openstreetmap.org/wiki/Nominatim_usage_policy).


Installing
----------
```bash
$ npm install node-nominatim2 [-S]
```

Usage
-----

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

  The search function calls to the ``http://nominatim.openstreetmap.org/search?<params>``

```
nominatim.search({q: "135 pilkington, avenue birmingham"}, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```

Make a call to the API using the reverse method.

  The reverse function calls to the endpoint: ``http://nominatim.openstreetmap.org/reverse?<query>``

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

Make a call to the API using the lookup method.

  The lookup function calls to the endpoint: ``http://nominatim.openstreetmap.org/lookup?<query>``

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

Additional parameters:

All methods accept optional parameters to accommodate the optional query string params available for the nominatim API calls. The following call is, for instance, possible and will return only the current property and its child properties:

```
var params = {
  q: '',
  addressdetails: 1,
  format: 'json',
  limit: 1,
  zoom: 18,
  'accept-language': 'en'
};
forecast.search(params, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
});
```


For more details check the [documentation](https://github.com/xbgmsharp/node-nominatim2/blob/master/docs/docs.md)

