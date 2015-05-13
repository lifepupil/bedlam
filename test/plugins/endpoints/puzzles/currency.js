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

describe('GET /puzzles/currency/{num}', function(){
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

  it('should take 23768479 and output $23,768,479.00', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/23768479', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.output).to.equal('$23,768,479.00');
      done();
    });
  });

  it('should take 237684.79 and output $237,684.79', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/237684.79', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.output).to.equal('$237,684.79');
      done();
    });
  });

  it('should take ij39fj and FAIL', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/ij39fj', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should take 1234.56.78 and FAIL', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/1234.56.78', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
