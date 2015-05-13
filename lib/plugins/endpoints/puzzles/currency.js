'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/currency/{num}',
    config: {
      validate: {
        params: {
          num: Joi.string().regex(/^\d+.?\d+$/)
        }
      },
      handler: function(request, reply){
        var inputStrings = request.params.num.split('.');
        var intstr = inputStrings[0];
        var output = '$';
        output = output.concat(intstr.substr(0, intstr.length % 3));
        intstr = intstr.substr(intstr.length % 3);

        while(intstr.length){
          if(output.length !== 1){
            output = output.concat(',');
          }
          output = output.concat(intstr.substr(0, 3));
          intstr = intstr.substr(3);
        }
        if(inputStrings[1]){
          output = output.concat(parseFloat('0.' + inputStrings[1]).toFixed(2).toString().substr(1));
        }else{
          output = output.concat('.00');
        }
        return reply({output: output});

        // var num = request.params.num;
        // var output;
        //
        // if(num.indexOf('.') !== -1){
        //   var decimalArr = num.split('.');
        //   output = parseFloat('0.' + decimalArr[1]).toFixed(2).toString().split('').reverse().join('') + '.';
        // } else {
        //   output = '00.';
        // }
        //
        // var revNum = num.split('').reverse();
        //
        // while(revNum.length > 3){
        //   output += revNum.splice(0, 3).join('') + ',';
        // }
        // output += revNum.join('') + '$';
        // output = output.split('').reverse().join('');
        //
        // return reply({output: output});
      }
    }
  });
  next();
};

exports.register.attributes = {
  name: 'puzzles.currency'
};
