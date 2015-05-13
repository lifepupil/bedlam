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

describe('GET /puzzles/isPrime/{num}', function(){
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

  it('should take 11 and output true', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPrime/11', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.equal(true);
      done();
    });
  });

  it('should take 12 and output false', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPrime/12', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.equal(false);
      done();
    });
  });

  it('should take 92694 and output false', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPrime/92694', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.equal(false);
      done();
    });
  });

  it('should take 92693 and output true', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPrime/92693', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.equal(true);
      done();
    });
  });

  it('should take lkjdlafd and FAIL', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPrime/lkjdlafd', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
