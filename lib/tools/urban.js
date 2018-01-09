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
      if(!r.body.list) return ca(new Error("No results found!"), null);
      var list = [];
      
      if(!rN) return ca(null, r.body.list);
      if(rN >= r.body.list.length) return ca(null, r.body.list);
      for(i = 0; i <= rN; i++) {
        list.push(r.body.list[i]);
      }
      return ca(null, list);
    });
}
