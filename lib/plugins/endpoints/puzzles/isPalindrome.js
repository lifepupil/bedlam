'use strict';
var Joi = require('joi');

exports.register = function(server, option, next){
  server.route({
    method: 'GET',
    path: '/puzzles/isPalindrome/{word}',
    config: {
      validate: {
        params: {
          word: Joi.string().required()
        }
      },
      handler: function(request, reply){
        var word = request.params.word;
        var drow = word.split('').reverse().join('');
        if(drow === word){
          return reply(true);
        }
        return reply(false);
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'puzzles.isPalindrome'
};
