# TOC
   - [Nominatim](#nominatim)
     - [#search](#nominatim-search)
     - [#reverse](#nominatim-reverse)
     - [#lookup](#nominatim-lookup)
<a name=""></a>
 
<a name="nominatim"></a>
# Nominatim
Search

Nominatim indexes named (or numbered) features with the OSM data set and a subset of other unnamed features (pubs, hotels, churches, etc) 

Reverse Geocoding

Reverse geocoding generates an address from a latitude and longitude. The optional zoom parameter specifies the level of detail required in terms of something suitable for an openlayers zoom level. 

Address lookup

Lookup the address of one or multiple OSM objects like node, way or relation. 

<a name="nominatim-search"></a>
## #search
should return data for an address.

```js
forecast.search({q: "135 pilkington, avenue birmingham"}, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
  res.should.not.equal.null;
  data.should.not.equal.null;
  done();
});
```

should be able to specify blocks to exclude via options param.

```js
var options = {
  q: "135 pilkington, avenue birmingham",
  timeout: 1000
};
forecast.search(options, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
  res.should.not.equal.null;
  data.should.not.equal.null;
  data.should.have.property('lon');
  data.should.have.property('lat');
  done();
});
```

should be able to specify multiple options via options param.

```js
var options = {
  q: "135 pilkington, avenue birmingham",
  accept-language: 'fr'
};
forecast.search(options, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
  res.should.not.equal.null;
  data.should.not.equal.null;
  data.should.have.property('lon');
  data.should.have.property('lat');
  done();
});
```

<a name="nominatim-reverse"></a>
## #reverse
should return an address from a latitude and longitude.

```js
forecast.reverse(options, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
  res.should.not.equal.null;
  data.should.not.equal.null;
  data.should.have.property('lon');
  data.should.have.property('lat');
  done();
});
```

<a name="nominatim-lookup"></a>
## #lookup
should return the address from one or multiple OSM objects like node, way or relation.

```js
forecast.lookup(options, function (err, res, data) {
  if (err) throw err;
  log('res: ' + util.inspect(res));
  log('data: ' + util.inspect(data));
  res.should.not.equal.null;
  data.should.not.equal.null;
  data.should.have.property('lon');
  data.should.have.property('lat');
  done();
});
```

