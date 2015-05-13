'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/gcd/{nums}',
    config: {
      validate: {
        params: {
          nums: Joi.string().regex(/^\d+,\d+$/)
        }
      },
      handler: function(request, reply){
        var nums = request.params.nums.split(',').map(function(n){
          return n * 1;
        });
        function gcd(n1, n2){
          if(n1 === n2){
            return n1;
          } else if(n2 > n1){
            return gcd(n1, n2 - n1);
          } else if(n1 > n2){
            return gcd(n1 - n2, n2);
          }
        }
        var output = gcd(nums[0], nums[1]);
        return reply({output: output});
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'puzzles.gcd'
};
