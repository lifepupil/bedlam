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

describe('GET /puzzles/vowelCount/{word}', function(){
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

  it('should take goofy and output 2 vowels', function(done){
    server.inject({method: 'GET', url: '/puzzles/vowelCount/goofy', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.count).to.equal(2);
      done();
    });
  });

  it('should take rfl and output 0 vowels', function(done){
    server.inject({method: 'GET', url: '/puzzles/vowelCount/rfl', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.count).to.equal(0);
      done();
    });
  });

  it('should take 123 and output 0 vowels', function(done){
    server.inject({method: 'GET', url: '/puzzles/vowelCount/123', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.count).to.equal(0);
      done();
    });
  });

  it('should take no output 0 and return 404', function(done){
    server.inject({method: 'GET', url: '/puzzles/vowelCount/', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(404);
      // expect(response.result.count).to.equal(0);
      done();
    });
  });
});
