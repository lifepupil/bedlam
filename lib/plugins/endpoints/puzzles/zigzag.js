'use strict';

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/zigzag/{numList}',
    config: {
      handler: function(request, reply){
        var output = [];

        var numList = request.params.numList.split(',').map(function(n){
          return n * 1;
        });

        if(numList.every(function(n){ return !isNaN(n); })){
          numList = numList.sort();
          while(numList.length){
            output.push(numList.pop());
            numList.reverse();
          }
          reply({output: output});
        }else{
          reply().code(400);
        }
      }
    }

  });
  next();
};

exports.register.attributes = {
  name: 'puzzles.zigzag'
};
