'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/isPrime/{num}',
    config: {
      validate: {
        params: {
          num: Joi.string().regex(/^-?\d+$/)
        }
      },
      handler: function(request, reply){
        var num = (request.params.num) * 1;
        for(var i = 2; i < num; i++){
          if(num % i === 0){
            return reply(false);
          }
        }
        return reply(true);
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'puzzles.isPrime'
};
