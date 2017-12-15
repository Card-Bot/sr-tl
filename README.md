# Sr-tl
A bunch of APIs for Node.js

## Example Usage
```js
const srtl = require('sr-tl');

srtl.searchUrban("bob", (inf) => {
  console.log(inf[0].definition);
});

srtl.genMeme({
  image: 'joker',
  top: 'pick a different font',
  bottom: 'people lose their minds',
  font: 'typoline-demo'//optional 
}, (link) => {
  console.log(link);
});
```
