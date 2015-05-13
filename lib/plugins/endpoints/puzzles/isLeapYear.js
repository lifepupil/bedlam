'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/isLeapYear/{year}',
    config: {
      validate: {
        params: {
          year: Joi.string().regex(/^-?\d+$/)
        }
      },
      handler: function(request, reply){
        var year = parseFloat(request.params.year);
        var leapYear = false;
        if(!(year % 4)){leapYear = true; }
        if(!(year % 100) && year % 400){leapYear = false; }
        return reply({leapYear: leapYear});
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'puzzles.isLeapYear'
};
