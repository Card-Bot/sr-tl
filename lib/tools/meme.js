const snekfetch = require('snekfetch');

function checkMemes(type) {
    if(!type) {
      let x = '';
      for(var b in require('./memes.json')) {
        x += require('./memes.json')[b].slice(35) + "\n";
      }
      return x;
    }
    for(var i in require('./memes.json')) {
      if(require('./memes.json')[i].slice(35) === type) return true;
    }
    return false;
}
function Meme() {
  this.create = (param, callback) => {
    let api = 'https://memegen.link/api/templates/';
    if(!param.alt) {
        if(!checkMemes(param.image)) return callback(new Error("Not a valid meme type"), null);
        let x = api + param.image + '/';
        x += param.top.replace("?", '~q').replace(/"/gi, '\'\'').replace(/_/gi, '__').replace(/-/gi, '--').replace(/ /gi, '_') + '/';
        x += param.bottom.replace('?', '~q').replace(/"/gi, '\'\'').replace(/_/gi, '__').replace(/-/gi, '--').replace(/ /gi, '_');
        snekfetch.get(x)
            .then(x => {
            callback(null, x.body.direct.masked + "?font=" + param.font);
            });
        } else {
        let x = 'https://memegen.link/custom/';
        x += param.top.replace('?', '~q').replace(/"/gi, '\'\'').replace(/_/gi, '__').replace(/-/gi, '--').replace(/ /gi, '_') + '/';
        x += param.bottom.replace('?', '~q').replace(/"/gi, '\'\'').replace(/_/gi, '__').replace(/-/gi, '--').replace(/ /gi, '_');
        if(param.font) {
            callback(null, x + '.jpg?font=' + param.font + '&alt=' + param.alt);
        }
        callback(null, x + '.jpg?alt=' + param.alt);
        }
    };
}
module.exports = new Meme();
