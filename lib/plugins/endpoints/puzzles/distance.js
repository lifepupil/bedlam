'use strict';
// var Joi = require('joi');

exports.register = function(server, option, next){
  server.route({
    method: 'GET',
    path: '/puzzles/distance/{crds}',
    config: {
      // validate: {
      //   params: {
      //     word: Joi.string().required()
      //   }
      // },
      handler: function(request, reply){
        var x = 0;
        var y = 1;
        var nextPair;
        var x1;
        var x2;
        var y1;
        var y2;
        var distance;

        var coords = request.params.crds.split(')(');
        // console.log('first set of coordinates', coords[0]);
        var pair = coords[0].substr(1, 4).split(',');
        console.log('coordinate pairs:', pair);
        //
        for(var c = 1; c < coords.length; c++){
          nextPair = coords[c].substr(0, 3).split(',');
          console.log('coordinate next pairs:', nextPair);
          x1 = pair[x] * 1;
          y1 = pair[y] * 1;
          x2 = nextPair[x] * 1;
          y2 = nextPair[y] * 1;
          // (Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2))

          distance = Math.sqrt((Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2)));
          // distance = 1;

        }
        return reply({distance: distance});
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'puzzles.distance'
};
