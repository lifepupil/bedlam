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

describe('GET /puzzles/zigzag/{numList}', function(){
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

  it('should take 1,2,3 and output [3,1,2]', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/1,2,3', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.output).to.deep.equal([3, 1, 2]);
      done();
    });
  });

  it('should take 1,3,2,4 and output [4,1,3,2]', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/1,3,2,4', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.output).to.deep.equal([4, 1, 3, 2]);
      done();
    });
  });

  it('should take aaa and fail', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/aaa', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      expect(response.result).to.not.be.ok;
      done();
    });
  });

  it('should take 1,2,a and fail', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/1,2,a', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      expect(response.result).to.not.be.ok;
      done();
    });
  });
});
