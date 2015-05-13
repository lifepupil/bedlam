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

describe('GET /puzzles/isPalindrome/{word}', function(){
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

  it('should take abba and output true', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPalindrome/abba', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.equal(true);
      done();
    });
  });

  it('should take beer and output false', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPalindrome/beer', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.equal(false);
      done();
    });
  });

  it('should take 12321 and output true', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPalindrome/12321', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result).to.equal(true);
      done();
    });
  });
});
