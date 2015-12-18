var log = require('debug')('node-nominatim2'),
    request = require('request'),
    util = require('util');

var defaults = {
  addressdetails: 1,
  format: 'json',
  limit: 1,
  zoom: 18,
  'accept-language': 'en'
};

function NominatimError (errors) {
  Error.captureStackTrace(this, NominatimError);
  this.errors = errors;
}

util.inherits(NominatimError, Error);

NominatimError.prototype.toString = function toString (){
  return "NominatimError: " + this.errors;
}

function Nominatim (options) {
  this.requestTimeout = options.timeout || 2500
  this.requestUserAgent = options.useragent || 'NodeJS request'
  this.requestReferer = options.referer || 'https://github.com/xbgmsharp/node-nominatim2'
  this.url = 'http://nominatim.openstreetmap.org/';
  this.search_url = this.url + 'search?';
  this.reverse_url = this.url + 'reverse?';
  this.lookup_url = this.url + 'lookup?';
  this.mapquestapi = {};
  //this.mapquestapi.APIKey = options.APIKey;
  this.mapquestapi.url = 'http://open.mapquestapi.com/nominatim/v1/';
  this.mapquestapi.search_url = this.mapquestapi.url + 'search.php?';
  this.mapquestapi.reverse_url = this.mapquestapi.url + 'reverse.php?';
}

Nominatim.prototype.search = function search (params, callback) {
  
  if (!params.q) throw new NominatimError('Missing Query string to search for.');
  var opts = extend_query(params);

  request.get({
	url: this.search_url,
	qs: opts,
	json: true,
	headers: {'User-Agent': this.requestUserAgent, Referer: this.requestReferer}, 
	timeout: this.requestTimeout
    }, function (err, res, data) {
    if (err) {
      callback(err);
    } else if(res.statusCode === 200) {
      callback(null, res, data);
    } else {
      callback(new NominatimError(data), res, data);
    }
  });
};

Nominatim.prototype.reverse = function reverse (params, callback) {

  if (!params.lat || !params.lon) throw new NominatimError('Missing latitude/longitude to search for.');
  var opts = extend_query(params);

  request.get({
	url: this.reverse_url,
	qs: opts,
	json: true,
	headers: {'User-Agent': this.requestUserAgent, Referer: this.requestReferer}, 
	timeout: this.requestTimeout
    }, function (err, res, data) {
    if (err) {
      callback(err);
    } else if(res.statusCode === 200) {
      callback(null, res, data);
    } else {
      callback(new NominatimError(data), res, data);
    }
  });
};

Nominatim.prototype.lookup = function lookup (params, callback) {
  
  if (!params.osm_ids) throw new NominatimError('Missing osm node, way or relations ids to return the addresses for.');
  var opts = extend_query(params);

  request.get({
	url: this.lookup_url,
	qs: opts,
	json: true,
	headers: {'User-Agent': this.requestUserAgent, 'Referer': this.requestReferer}, 
	timeout: this.requestTimeout
    }, function (err, res, data) {
    if (err) {
      callback(err);
    } else if(res.statusCode === 200) {
      callback(null, res, data);
    } else {
      callback(new NominatimError(data), res, data);
    }
  });
};

var extend_query = function(params) {
  for (var i in defaults) {
    if (!params[i]) {
      params[i] = defaults[i];
    }
  }

  return params;
};

module.exports = Nominatim;
