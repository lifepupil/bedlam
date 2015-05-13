'use strict';
// var Joi = require('joi');

exports.register = function(server, option, next){
  server.route({
    method: 'GET',
    path: '/puzzles/vowelCount/{word}',
    config: {
      // validate: {
      //   params: {
      //     word: Joi.string().required()
      //   }
      // },
      handler: function(request, reply){
        var wordArr = request.params.word.split('');
        var vowels = ['a', 'e', 'i', 'o', 'u'];
        var count = 0;
        var histogram = {
          a: null,
          e: null,
          i: null,
          o: null,
          u: null
        };
        for(var w = 0; w < wordArr.length; w++){
          for(var v = 0; v < wordArr.length; v++){
            if(wordArr[w] === vowels[v]){
              // histogram.vowels[v]
              count += 1;
            }
          }
        }
        return reply({count: count});
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'puzzles.vowelCount'
};
