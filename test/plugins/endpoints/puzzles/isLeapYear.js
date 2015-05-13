/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var after = lab.after;

var server;

describe('GET /puzzles/isLeapYear/{year}', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should take 2000 and output true', function(done){
    server.inject({method: 'GET', url: '/puzzles/isLeapYear/2000', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.leapYear).to.equal(true);
      done();
    });
  });

  it('should take 1900 and output false', function(done){
    server.inject({method: 'GET', url: '/puzzles/isLeapYear/1900', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.leapYear).to.equal(false);
      done();
    });
  });

  it('should take 1901 and output false', function(done){
    server.inject({method: 'GET', url: '/puzzles/isLeapYear/1901', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.leapYear).to.equal(false);
      done();
    });
  });

  it('should take 0 and output true', function(done){
    server.inject({method: 'GET', url: '/puzzles/isLeapYear/0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.leapYear).to.equal(true);
      done();
    });
  });

  it('should take alsdfalsjd and FAIL', function(done){
    server.inject({method: 'GET', url: '/puzzles/isLeapYear/alsdfalsjd', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      // expect(response.result.leapYear).to.equal(true);
      done();
    });
  });

  it('should take -4 and output true', function(done){
    server.inject({method: 'GET', url: '/puzzles/isLeapYear/-4', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.leapYear).to.equal(true);
      done();
    });
  });
});
