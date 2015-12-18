'use strict';

var log = require('debug')('node-nominatim2'),
    util = require('util');

require('should');

var Nominatim = require('../index');

var options = {
    useragent: "MyApp",
    referer: "https://github.com/xbgmsharp/node-nominatim2"
},
    nominatim = new Nominatim(options);

describe('Nominatim', function () {
  describe('#search', function () {
    it('should return data for an address details and latitude and longitude', function (done) {
      nominatim.search({ q: '135 pilkington, avenue birmingham'}, function (err, res, data) {
        if (err) throw err;
        //log('res.request.url: ' + util.inspect(res.request));
        log('data: ' + util.inspect(data));
        res.should.not.equal.null;
	//res.request.req._headers.should.have.property('user-agent');
	//res.request.should.have.property('referer');
        data.should.not.equal.null;
        data[0].should.have.property('lon');
        data[0].should.have.property('lat');
        data[0].should.have.property('address');
        data[0].address.should.have.property('country');
        done();
      });
    });
/*
    it('should be able to set the language via options param', function (done) {
      var options = {
        q: '135 pilkington, avenue birmingham',
        'accept-language': 'fr'
      };
      nominatim.search(options, function (err, res, data) {
        if (err) throw err;
        log('res.request.url: ' + util.inspect(res.request.req));
        log('data: ' + util.inspect(data));
        res.should.not.equal.null;
        data.should.not.equal.null;
        data.should.have.property('lat');
        data.should.have.property('lon');
        data.should.have.property('address');
        done();
      });
    });
    it('should be able to specify multiple options via options param', function (done) {
      var options = {
        q: '135 pilkington, avenue birmingham',
        'accept-language': 'fr'
      };
      nominatim.search(options, function (err, res, data) {
        if (err) throw err;
        log('res.request.url: ' + util.inspect(res.request.req));
        log('data: ' + util.inspect(data));
        res.should.not.equal.null;
        data.should.not.equal.null;
        data.should.have.property('lon');
        data.should.have.property('lat');
        data.should.have.property('address');
        data.should.have.property('displayname');
        done();
      });
    });
*/
  });
  describe('#reverse', function () {
    it('should return data for an address from latitude and longitude', function (done) {
      var options = {
        'lat': 35.6916666,
        'lon': 139.7746613
      };
      nominatim.reverse(options, function (err, res, data) {
        if (err) throw err;
        //log('res.request.url: ' + util.inspect(res.request.req));
        log('data: ' + util.inspect(data));
        res.should.not.equal.null;
        data.should.not.equal.null;
        data.should.have.property('lon');
        data.should.have.property('lat');
        data.should.have.property('address');
        data.address.should.have.property('country');
        done();
      });
    });
  });
  describe('#lookup', function () {
    it('should return the address from one or multiple OSM objects like node, way or relation.', function (done) {
      var options = {
        'osm_ids': 'R146656,W104393803,N240109189'
      };
      nominatim.lookup(options, function (err, res, data) {
        if (err) throw err;
        //log('res.request.url: ' + util.inspect(res.request.req));
        log('data: ' + util.inspect(data));
        res.should.not.equal.null;
        data.should.not.equal.null;
        data[0].should.have.property('lon');
        data[0].should.have.property('lat');
        data[0].should.have.property('address');
        data[0].address.should.have.property('country');
        done();
      });
    });
  });
});
