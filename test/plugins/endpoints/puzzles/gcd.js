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

describe('GET /puzzles/gcd/{nums}', function(){
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

  it('should take 345,268 and output 1', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/345,268', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.output).to.equal(1);
      done();
    });
  });

  it('should take 345,345 and output 345', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/345,345', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.output).to.equal(345);
      done();
    });
  });

  it('should take 0,0 and output 0', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/0,0', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.output).to.equal(0);
      done();
    });
  });

  it('should take 345 and FAIL', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/345', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });

  it('should take dljslfajf and FAIL', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/dljslfajf', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
