const snekfetch = require('snekfetch');

module.exports = function (inp, opts, call)  {
  if(typeof opts === "function") {
    var ca = opts
    var op = {}
  } else {
    var op = opts
    var ca = call
  }
  
  if(op.results) {
    var rN = op.results
  }
  
  snekfetch.get(`http://api.urbandictionary.com/v0/define?term=${inp}`)
    .then(r => {
      if(!r.body.list) return call(new Error("No results found!"));
      var list = [];
      
      if(!rN) return ca(r.body.list[0]);
      if(rN >= r.body.list.length) return ca(r.body.list);
      for(i = 0; i <= rN; i++) {
        list.push(r.body.list[i]);
      }
      return ca(list);
    });
}
